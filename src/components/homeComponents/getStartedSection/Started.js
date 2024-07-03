import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './started.css';

const Started = () => {

  const { user } = useSelector(state => state.auth);

  const navigate = useNavigate();

  //Handel Click
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
    <div className='section-6'>
      {user?.position === 'freeLancer' ?
        <>
          <h4 className='title'>هل أنت جاهز لبدء اول عمل لك؟</h4>
          <Link to='/browseprojects'>تصفح المشاريع المتاحة</Link>
        </>
        :
        <>
          <h4 className='title'>هل أنت جاهز لبدء مشروعك؟</h4>
          {user ?
            <Link to='/addproject'>ابدا مشروعك الان</Link>
            :
            <Link onClick={handelClick} to='/'>ابدا مشروعك الان</Link>}
        </>
      }
    </div>
  )
}

export default Started;
