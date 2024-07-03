import { logoutUser } from '../../redux/apiCalls/authApiCall';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';
import Swal from "sweetalert2";
import './header.css';

function Header() {

    //Handel Side Bar
    function handelSideBar() {
        document.querySelector('.side-bar').classList.toggle('show');
        document.querySelector('.menu i').classList.toggle('bi-x-lg');
    };

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    //HandelCLick
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
        });
    }


    return (
        <div className='header'>
            <div className='header-content container-lg'>

            <div className='header-right'>
                    <Link to='/' className='logo'>بعيد</Link>
                </div>

                <nav className='nav'>
                    <ul className='nav-links'>
                        {
                            user?.position === "businessOwner" ? <Link to='/addproject'><i className="bi bi-plus-square"></i>اضف مشروع</Link> : ""
                        }

                        {user ?
                            <>
                                <Link to='/profilefreelancers'><i className="bi bi-people-fill"></i>ابحث عن مستقلين</Link>
                                <Link to='/browseprojects'><i className="bi bi-collection-fill"></i>تصفح المشاريع</Link>
                            </>
                            :
                            <>
                                <Link onClick={handelClick} to='/'><i className="bi bi-people-fill"></i>ابحث عن مستقلين</Link>
                                <Link onClick={handelClick} to='/'><i className="bi bi-collection-fill"></i>تصفح المشاريع</Link>
                            </>
                        }

                        {
                            user?.isAdmin === true ? <Link to='/admin-dashboard'><i className="bi bi-person-check"></i>لوحة التحكم</Link> : ""
                        }
                    </ul>
                </nav>

                <div className='header-left'>
                    {
                        user ?
                            (
                                <>
                                    <div className='header-left-user-info'>
                                        <Link to={`/profile/${user?.id}`}>
                                            <span style={{fontFamily: '"Open Sans", sans-serif'}} className='header-left-username'>{user?.username}</span>
                                            <img src={user?.profilePhoto.url}
                                                alt='profile Photo'
                                                className='header-left-user-photo'
                                            />
                                        </Link>
                                        <Link to='/' onClick={() => dispatch(logoutUser())} className='header-left-btn-logout'>خروج</Link>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <Link to='/login'><i className="bi bi-box-arrow-in-left"></i>دخول</Link>
                                    <Link to='/signup'><i className="bi bi-person-plus-fill"></i>تسجيل حساب</Link>
                                </>
                            )
                    }

                </div>

                <div className='menu' onClick={handelSideBar}>
                    <i className="bi bi-list"></i>
                </div>
            </div>
            <SideBar />
        </div>
    )
}

export default Header
