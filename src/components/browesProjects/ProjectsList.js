import ProjectItem from "./ProjectItem.js";
import './projectList.css';


const ProjectsList = ({projects}) => {
  return (
    <div className="project-list">
      {projects.map(item => <ProjectItem project={item} key={item._id} /> )}
    </div>
  )
}

export default ProjectsList;
