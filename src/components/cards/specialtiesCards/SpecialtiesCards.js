import { fetchCategoreis } from '../../../redux/apiCalls/categoryApiCall';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './specialtiesCards.css';



const SpecialtiesCards = (category) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCategoreis())
  }, [])

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
    <>
      {user ?
        <Link to={`projects/categories/${category.title}`} className='box'>
          <img src={category.image} alt='photo' />
          <p>{category.title}</p>
        </Link>
        :
        <Link onClick={handelClick} to={`/`} className='box'>
          <img src={category.image} alt='photo' />
          <p>{category.title}</p>
        </Link>
      }
    </>
  )
}

export default SpecialtiesCards;
