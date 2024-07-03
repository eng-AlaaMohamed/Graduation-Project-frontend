import { forgotPassword } from '../../redux/apiCalls/passwordApiCall';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import './forgetPass.css';
import Swal from 'sweetalert2';


function ForgetPass() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("الايميل مطلوب");

    dispatch(forgotPassword(email));

    Swal.fire({
      title: "تحقق من بريدك الالكتروني",
      showClass: {
        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
      },
      hideClass: {
        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
      }
    });
  }

  return (
    <div className='forget-password-page'>
      <h1 className='title'>نسيت كلمة المرور</h1>
      <form onSubmit={formSubmitHandler} className='forget-password-form'>
        <label htmlFor='email' className='form-label'>البريد الاكتروني:</label>
        <input
          type='email'
          id='rmail'
          placeholder='ادخل البريد الالكتروني'
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className='form-btn' >ارسال</button>
      </form>
    </div>
  )
}

export default ForgetPass;
