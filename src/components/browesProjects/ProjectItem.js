import { deleteProject } from '../../redux/apiCalls/projectsApiCall';
import { UpdateProjectModel } from '../indexComponents';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import './projectItem.css';



const ProjectItem = ({ project, username, userId, profilePhoto}) => {

  const { user } = useSelector( state => state.auth);
  const { profile } = useSelector( state => state.profile);
 
  const dispatch = useDispatch();

  const [updateProject, setUpdateProject] = useState(false);

  const profilelink = userId ? `/profile/${userId}` : `/profile/${project.user?._id}`;

  //Delete Project Handler
  const deleteProjectHandler = () => {
    Swal.fire({
      title: "هل انت متاكد من حذف المشروع؟",
      text: "عند حذف المشروع لا يمكنك استرداده!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "لقد تم حذف المشروع الخاص بك",
          icon: "success"
        }).then((result) => {
          if(result.isConfirmed) {
            dispatch(deleteProject(project?._id));
            window.location.reload();
          }
        })
      }
    });
  }

  return (

    <div className='project-item-page' >
      <div className='header-project'>
        <div className='user-info'>
          <img className='profile-photo-in-project' src={userId? profilePhoto?.url: project?.user?.profilePhoto?.url} alt='profile Photo' />
          <Link to= {profilelink}>{username? username : project.user?.username}</Link>
        </div>
        <div className='project-date'>
          { new Date(project?.createdAt).toDateString() }
        </div>
      </div>

      <div className='project-info'>
        <div className='project-title-and-category'>
          <span className='title'>عنوان المشروع: <span>{project?.title}</span></span>
          <span className='category'> التصنيف: <span>{project?.category}</span></span>
        </div>
        <p className='project-description'>
          {project?.description}
        </p>
        <div className='red-more-and-update-and-delete-project'>
          <Link to={`/projects/detalis/${project?._id}`}>اقرا المزيد ...</Link>
          {user?.id === userId && (
            <div className='icons'>
            <i onClick={() => setUpdateProject(true)} className='bi bi-pencil-square update'></i>
            <i onClick={deleteProjectHandler} className='bi bi-trash-fill delete'></i>
            </div>     
          )}
        </div>
      </div>
      {updateProject && <UpdateProjectModel project={project} setUpdateProject={setUpdateProject} />}
    </div>
  )
}

export default ProjectItem;
