import { createProjectInPortfolio } from '../../../redux/apiCalls/portfolioApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import './userProfile.css';



function AddProjectToPortfolio({setOpenAddProjectToPortfolio}) {

    const dispatch = useDispatch();
    const { loading, isPortfolioCreated } = useSelector( state => state.portfolio);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [file, setFile] = useState(null);

    //Form Submit Handler
    const formSubmetHandler = (e) => {
        e.preventDefault();

        if(title.trim() === "") return toast.error('عنوان العمل مطلوب');
        if(description.trim() === "") return toast.error('وصف العمل مطلوب');
        if(!file) return toast.error('اضف صورة للعمل');

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if(projectLink.trim() !== ''){
            formData.append("projectLink", projectLink);
        };
        formData.append("image", file);

        dispatch(createProjectInPortfolio(formData));
    }


    useEffect(() => {
        if(isPortfolioCreated) {
            setOpenAddProjectToPortfolio(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "تم انشاء العمل بنجاح",
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() => {window.location.reload()}, 1500);
        }
    }, [isPortfolioCreated]);

  return (
    <div className="form-create-project-to-portfolio">
        <form onSubmit={formSubmetHandler} className='form-create-project-to-portfolio-content' >
            <abbr title='close'>
                <i
                    className='bi bi-x-circle-fill form-close'
                    onClick={() => setOpenAddProjectToPortfolio(false)}
                ></i>
            </abbr>
            <h2 className='form-title'>اضف عملك الخاص</h2>
            <label htmlFor='title' >عنوان العمل:</label><br />
            <input
                id='title' 
                type='text' 
                name='title'
                placeholder='اكتب عنوان العمل'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            
            <label htmlFor='abute' >وصف العمل:</label><br />
            <textarea
                id='abute' 
                placeholder='اكتب وصف توضيحي للعمل'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor='file' >اضف صورة للعمل:</label><br />
            <input
                type='file'
                name='file'
                id='file' 
                className='craete-upload-image'
                onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor='link' >اضف رابط العمل:</label><br />
            <input
                type='link'
                id='link' 
                placeholder='ادخل رابط للعمل (اختياري)'
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
            />

           <div className='form-btn'>
            <button type='submit' className='crerate-projecttoportfolio-btn'>
                {loading? 
                    <RotatingLines
                        visible={true}
                        height="30"
                        width="30"
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                : 
                    "انشاء"
                }
            </button>
           </div>
        </form>
    </div>
  )
}

export default AddProjectToPortfolio;
