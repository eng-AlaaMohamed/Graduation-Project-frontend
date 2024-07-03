import { AbouteAddProject, ProjectInfo } from '../../components/indexComponents'
import './addproject.css';

function AddProject() {
  return (
    <div className='add-project'>
      <div className='add-project-content container-lg'>
        <div className='add-project-page-title'>
          <h3>اضافة مشروع</h3>
        </div>
        <div className='forminfo-aboute-project'>
          <ProjectInfo />
          <AbouteAddProject />
        </div>
      </div>
    </div>
  )
}

export default AddProject;
