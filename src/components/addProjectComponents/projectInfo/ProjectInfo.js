import { fetchCategoreis } from '../../../redux/apiCalls/categoryApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import axios  from 'axios';
import './projectInfo.css';


const ProjectInfo = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { categoreis } = useSelector( state => state.category);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);

  const { token } = JSON.parse(localStorage.getItem('userInfo'));

  //form submet handler
  const formSubmetHandler = (e) => {
    e.preventDefault();

    if(title.trim() === "") return toast.error('عنوان المشروع مطلوب');
    if(category.trim() === "") return toast.error('تصنيف المشروع مطلوب');
    if(description.trim() === "") return toast.error('وصف المشروع مطلوب');


    axios.post('https://graduation-project-backend-seven.vercel.app/api/projects', {
      title,
      category,
      description,
    }, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then(() => {
      setCreated(true);
    }).catch((error) => {
      toast.error(error)
    });

  };

  useEffect(()=> {
    if(created) {
      navigate("/browseprojects");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم نشر المشروع",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [created, navigate]);

  useEffect( () => {
    dispatch(fetchCategoreis())
  }, []);

  return (
    
    <div className='create-project'>

      <form onSubmit={formSubmetHandler} className='create-project-form'>

          <label htmlFor='title' >عنوان المشروع</label><br />
          <input
            id='title' 
            type='text' 
            name='title'
            placeholder='اكتب عنوان المشروع'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

          <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
          >
              <option disabled value="">حدد القسم</option>
              {
                categoreis?.map(category => 
                  <option key={category._id} value={category.title}>{category.title}</option>
                )
              }
          </select>

          <label htmlFor='abute' >وصف المشروع</label><br />
          <textarea
            id='abute' 
            placeholder='اكتب وصف توضيحي المشروع'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

          <button className='btn'>
            انشر الان
          </button>
      </form>
    </div>
  )
}

export default ProjectInfo;
