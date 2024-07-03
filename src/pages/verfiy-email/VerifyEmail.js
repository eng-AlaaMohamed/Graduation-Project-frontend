import './verifyEmail.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyEmail } from '../../redux/apiCalls/authApiCall';



const VerifyEmail = () => {

    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector( state => state.auth);

    const { userId, token } = useParams();

    useEffect(()=>{
        dispatch(verifyEmail(userId,token))
    }, [userId,token]);

  return (
    <section className='verify-email'>
        {isEmailVerified ?
            <>
                <i className='bi bi-patch-check verify-email-icon'></i>
                <h1 className='verify-email-title'>
                    تم التحقق من البريد الالكتروني الخاص بك بنجاح
                </h1>
                <Link to='/login' className='verify-email-link'>
                    اذهب لفحة تسجيل الدخول
                </Link>
            </>
            :
            <>
                <h1 className='verify-email-not-found'>بريد الكتروني غير موجود</h1>
            </>
        }
    </section>
  )
}

export default VerifyEmail;
