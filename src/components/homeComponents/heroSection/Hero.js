import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './hero.css';


const Hero = () => {

  const { user } = useSelector(state => state.auth);

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
    <div className='landing'>
      <div className='overlay'></div>
      <div className='landing-content'>
        <h1>وظف أفضل المستقلين لإنجاز أعمالك عن بعد</h1>
        <p>أنجز مشاريعك بسهولة وأمان عبر أكبر منصة عمل حر بالعالم العربي</p>
        <div className='button-content '>
          {user?.position === 'freeLancer' ?
            ""
            :
            user ?
              <Link to={'/addproject'}>ابدا مشروعك الان</Link>
              :
              <Link onClick={handelClick} to={'/'}>ابدا مشروعك الان</Link>
          }
          {user?.position === 'businessOwner' ?
            ""
            :
            user ?
              <Link to='/browseprojects'>ابحث عن عمل</Link>
              :
              <Link onClick={handelClick} to='/'>ابحث عن عمل</Link>
          }
        </div>
      </div>
      <div className='arrow'>
        <a href='#section-1'><i className="bi bi-chevron-double-down"></i></a>
      </div>
    </div>
  )
}
export default Hero;
