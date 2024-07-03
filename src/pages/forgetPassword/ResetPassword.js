import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import './forgetPass.css';
import { getResetPassword, resetPassword } from '../../redux/apiCalls/passwordApiCall';


function ResetPassword() {

    const dispatch = useDispatch();
    const { isError } = useSelector(state => state.password);

    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(getResetPassword(userId, token));
    }, [userId, token]);

    const [password, setPassword] = useState('');

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (password.trim() === "") return toast.error("كلمة المرور مطلوبه");

        dispatch(resetPassword(password, { userId, token }));
    }

    return (
        <div className='forget-password-page'>
            {isError ? <h2>لا يوجد</h2> :
                <>
                    <h1 className='title'>اعادة تعيين كلمة المرور</h1>
                    <form onSubmit={formSubmitHandler} className='forget-password-form'>
                        <label htmlFor='password' className='form-label'> كلمة المرور الجديده:</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='ادخل كلمة المرور الجديده'
                            className='form-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit' className='form-btn' >ارسال</button>
                    </form>
                </>
            }
        </div>
    )
}

export default ResetPassword;
