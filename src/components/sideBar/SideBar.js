import { logoutUser } from '../../redux/apiCalls/authApiCall';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import React from 'react';
import './sideBar.css';

function SideBar() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  //Handel Side Bar
  function handelSideBar() {
    document.querySelector('.side-bar').classList.toggle('show');
    document.querySelector('.menu i').classList.toggle('bi-x-lg');
  }

  //HandelCLick
  const navigate = useNavigate();
  const handelClick = () => {
    Swal.fire({
      title: "عليك تسجيل الدخول اولا, ان لم يكن لك حساب قم بانشاء حسابك الخاص",
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      cancelButtonColor: 'red',
      confirmButtonText: "دخول",
      confirmButtonColor: '#0075ff',
      denyButtonText: `انشاء حساب`,
      denyButtonColor: '#0075ff',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate('/login');
      } else if (result.isDenied) {
        navigate('/signup');
      }
    })
  }

  //Handel logOut User
  function handelLogout() {
    dispatch(logoutUser());
  };

  return (
    <div className='side-bar'>
      <ul className='sideBar-links'>
        {user ?
          <>
            {
              user?.position === "businessOwner" ? <Link to='/addproject'><i className="bi bi-plus-square"></i>اضف مشروع</Link> : ""
            }

            <Link onClick={handelSideBar} to='/profilefreelancers'><i className="bi bi-people-fill"></i>ابحث عن مستقلين</Link>

            <Link onClick={handelSideBar} to='/browseprojects'><i className="bi bi-collection-fill"></i>تصفح المشاريع</Link>
          </>
          :
          <>
            {
              user?.position === "businessOwner" ? <Link to='/addproject'><i className="bi bi-plus-square"></i>اضف مشروع</Link> : ""
            }
            <Link onClick={() => { handelSideBar(); handelClick(); }} to='/'><i className="bi bi-people-fill"></i>ابحث عن مستقلين</Link>

            <Link onClick={() => { handelSideBar(); handelClick(); }} to='/'><i className="bi bi-collection-fill"></i>تصفح المشاريع</Link>
          </>
        }

        {
          user?.isAdmin === true ? <Link onClick={handelSideBar} to='/admin-dashboard'><i className="bi bi-person-check"></i>لوحة التحكم</Link> : ""
        }
      </ul>
      {
        user ?
          (
            <>
              <div className='side-bar-user-info'>
                <Link onClick={handelSideBar} to={`/profile/${user?.id}`}>
                  <span className='side-bar-username'>{user?.username}</span>
                  <img src={user?.profilePhoto.url}
                    alt='profile Photo'
                    className='side-bar-user-photo'
                  />
                </Link>
                <Link to='/' onClick={() => { handelLogout(); handelSideBar(); }} className='side-bar-btn-logout'>Logout</Link>
              </div>
            </>
          )
          :
          (
            <div className='register'>
              <Link onClick={handelSideBar} to='/login'><i className="bi bi-box-arrow-in-left"></i>دخول</Link>
              <Link onClick={handelSideBar} to='/signup'><i className="bi bi-person-plus-fill"></i>تسجيل حساب</Link>
            </div>
          )
      }
    </div>
  )
}

export default SideBar;
