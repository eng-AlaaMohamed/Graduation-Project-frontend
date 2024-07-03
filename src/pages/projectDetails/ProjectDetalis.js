import { fetchSingleProject } from '../../redux/apiCalls/projectsApiCall';
import { ApplicantList } from '../../components/indexComponents';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './projectDetalis.css';
import axios from 'axios';


const ProjectDetalis = () => {

  const dispatch = useDispatch();
  const { project } = useSelector(state => state.project);
  const projectId = project?._id;


  let { id } = useParams();
  const { token, position } = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleProject(id))
  }, [id]);


  //Handle Click To Bottom Aplicant
  function handleClick() {
    axios.post('https://graduation-project-backend-seven.vercel.app/api/applicants', { projectId }, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then(() => {
      Swal.fire({
        title: "تم التقدم الي المشروع",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'تم'
      }).then((isOk) => {
        if (isOk) {
          window.location.reload();
        }
      });
    }).catch((error) => {
      Swal.fire({
        title: error.response.data.message,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
           `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    })
  };

  return (
    <div className='project-detalis-page'>
      <div className='project-details-content container-lg'>

        <div className='title-page'>
          <h2>تفاصيل المشروع</h2>
        </div>

        <div className='heder-project-detalis'>
          <div className='user-info'>
            <div>
              الناشر:
              <img className='user-photo' src={project?.user?.profilePhoto.url} alt='user photo' />
            </div>
            <div className='username'>{project?.user?.username}</div>
          </div>
          <div className='date-project-detalis'>
            {new Date(project?.createdAt).toDateString()}
          </div>
        </div>

        <div className='project-title'>
          عنوان المشروع:
          <span>{project?.title}</span>
        </div>

        <div className='category-project-detalis'>
          التصنيف: <span>{project?.category}</span>
        </div>

        <p className='project-description'>
          {project?.description}
        </p>

        <div className='project-applicants-section'>
          <h3 className='title-section'>المتقدمين</h3>
          <div className='project-applicants'>
            {
              project?.applicants.length > 0 ?
                <ApplicantList applicants={project?.applicants} />
                :
                <h5 className='not-found-applicants'>لا يوجد متقدمين</h5>
            }
          </div>
        </div>

        {
          position === "businessOwner" ?
            ""
            :
            <>
              <button onClick={handleClick} className='applicant-button'>
                تقدم للمشروع
              </button>
            </>
        }

      </div>
      <ToastContainer
        position='top-center'
        theme='colored'
      />
    </div>
  )
}

export default ProjectDetalis;
