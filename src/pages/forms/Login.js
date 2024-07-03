import { loginUser } from '../../redux/apiCalls/authApiCall';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './signIn.css';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //From Submet Handelar
  const fromSubmetHandelar = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error('الايميل مطلوب');
    if (password.trim() === "") return toast.error('الرقم السري مطلوب');

    dispatch(loginUser({ email, password }));
  }

  return (
    <div className='signIn-page'>
      <div className='signIn-content'>
        <div className='text'>
          <h1 className='title'>مرحبا !</h1>
          <p>ليس لديك حساب مسبق ؟</p>
          <Link to='/signup'>تسجيل</Link>
        </div>
        <form onSubmit={fromSubmetHandelar} className='form'>

          <h2 className='title'>تسجيل دخول</h2>

          <label htmlFor='email'>البريد الإلكتروني </label>
          <input
            id='email'
            type='email'
            placeholder='ادخل البريد الالكتروني الخاص بك'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <label htmlFor='pass'>كلمة المرور</label>
          <input
            id='pass'
            type='password'
            placeholder='ادخل كلمة المرور الخاصة بك'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <button type='submet'>دخول</button>
          <div className='forget-password'>هل نسيت كلمة المرور؟<Link to={'/forgetpassword'}>اعادة تعيين</Link></div>
          <div className='i-dont-have-acc'>ليس لديك حساب؟<Link to='/signup'>تسجيل</Link></div>
        </form>
      </div>
      <ToastContainer
        position='top-center'
        theme='colored'
      />
    </div>
  )
}

export default Login;
