import { fetchCategoreis } from '../../redux/apiCalls/categoryApiCall';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowCircleDown } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './sideBarToUsers.css';

const SideBarToUsers = () => {

  const dispatch = useDispatch();
  const { categoreis } = useSelector( state => state.category);

  useEffect( () => {
    dispatch(fetchCategoreis())
  }, [])

  const sidbarLinks = useRef();

function shwoSidear () {
  sidbarLinks.current.classList.toggle('open')
}


  return (
    <div className='project-sidebar'>
      <h4 onClick={shwoSidear} className='title'>التصنيف حسب التخصص:<FaArrowCircleDown className='icone' /></h4>
      <ul ref={sidbarLinks} className="sidbar-links">
          {categoreis?.map( category => 
          <Link className='sidebar-link' to={`/categories/${category.title}`} key={category._id} >
            {category.title}
          </Link>)}
      </ul>
    </div>
  )
}

export default SideBarToUsers;
