import { updatePortfolio } from '../../redux/apiCalls/portfolioApiCall';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './updatePortfolioModel.css';



const UpdatePortfolioModel = ({projectTitle ,projectDescription, ProjectLink, projectId, setOpenUpdatePortfolio}) => {

    const dispatch = useDispatch();
  
    const [title, setTitle] = useState(projectTitle);
    const [description, setDescription] = useState(projectDescription);
    const [projectLink, setProjectLink] = useState('');


    //Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if(title.trim() === "") return toast.error('عنوان العمل مطلوب');
        if(description.trim() === "") return toast.error('تصنيف العمل مطلوب');

        const ubdatedPortfolio = {title, description};

        if(projectLink.trim() !== ''){
            ubdatedPortfolio.projectLink = projectLink;
        };

    
        dispatch(updatePortfolio(ubdatedPortfolio, projectId));
        setOpenUpdatePortfolio(false);
        window.location.reload();
    };

  return (
    <div className='update-portfolio'>
        <form onSubmit={formSubmitHandler} className='update-portfolio-form'>
                <abbr title='close'>
                    <i
                     className='bi bi-x-circle-fill update-portfolio-form-close'
                     onClick={() => setOpenUpdatePortfolio(false)}
                     ></i>
                </abbr>
                <h1 className='update-portfolio-title'>تعديل العمل</h1>

                <input
                    type='text' 
                    className='update-portfolio-input'
                    value={title}
                    placeholder='ادخل عنوان العمل'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className='update-portfolio-textarea' 
                    rows='5'
                    value={description}
                    placeholder='ادخل وصف العمل'
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input
                    type='text' 
                    className='update-portfolio-input'
                    value={projectLink}
                    placeholder='ادخل رابط المشروع'
                    onChange={(e) => setProjectLink(e.target.value)}
                />

                <button type='submit' className='update-portfolio-btn'>
                    تعديل
                </button>
        </form>
    </div>
  )
}

export default UpdatePortfolioModel;
