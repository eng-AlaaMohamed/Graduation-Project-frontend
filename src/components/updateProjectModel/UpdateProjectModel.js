import { fetchCategoreis } from '../../redux/apiCalls/categoryApiCall';
import { updateProject } from '../../redux/apiCalls/projectsApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './updateProjectModel.css';

const UpdateProjectModel = ({setUpdateProject, project}) => {
    
    const { categoreis } = useSelector( state => state.category);

    const dispatch = useDispatch();
  
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [category, setCategory] = useState(project.category);


    //Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(title.trim() === "") return toast.error('عنوان المشروع مطلوب');
        if(category.trim() === "") return toast.error('تصنيف المشروع مطلوب');
        if(description.trim() === "") return toast.error('وصف المشروع مطلوب');

    
        dispatch(updateProject({title, category, description}, project?._id));
        setUpdateProject(false);
    };

    useEffect( () => {
        dispatch(fetchCategoreis())
      }, [])
    

  return (
    <div className='update-project'>
        <form onSubmit={formSubmitHandler} className='update-project-form'>
                <abbr title='close'>
                    <i
                     className='bi bi-x-circle-fill update-project-form-close'
                     onClick={() => setUpdateProject(false)}
                     ></i>
                </abbr>
                <h1 className='update-project-title'>تعديل المشروع</h1>
                <input
                    type='text' 
                    className='update-project-input'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className='update-project-input'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value=''>حدد القسم</option>
                    {categoreis?.map( category => 
                        <option key={category._id} value={category.title}>{category.title}</option>
                    )}
                </select>
                <textarea
                    className='update-project-textarea' 
                    rows='5'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                <button type='submit' className='update-project-btn'>
                    تعديل
                </button>
        </form>
    </div>
  )
}

export default UpdateProjectModel;
