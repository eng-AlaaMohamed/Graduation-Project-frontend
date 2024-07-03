import './usersTable.css';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteProject, getAllProjects } from '../../redux/apiCalls/projectsApiCall';


function ProjectsTable() {

    const dispatch = useDispatch();
    const { projects } = useSelector( state => state.project);

    useEffect(() => {
        dispatch(getAllProjects())
    }, []);

//Delete Project Handler
const deleteProjectHandler = (projectId) => {
    Swal.fire({
    title: "هل انت متاكد من حذف العمل؟",
    text: "!اذا قمت بحذف العمل لا يمكنك استردادة",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
        title: "تم الحذف!",
        text: "تم حذف العمل.",
        icon: "success"
        }).then((result) => {
        if(result.isConfirmed) {
            dispatch(deleteProject(projectId));
        }
        })
    }
    });
}

  return (
    <section className='table-container'>
      <AdminSidebar />
      <div className='table-wrapper'>
        <h1 className='table-title'>Projects</h1>
        <table className='the-table'>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Users</th>
                    <th>Project Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                            <div className='table-image'>
                                <img
                                    src={item.user.profilePhoto?.url}
                                    alt=''
                                    className='table-user-image'
                                />
                                <span className='table-username'>
                                    {item.user.username}
                                </span>
                            </div>
                        </td>
                        <td>{item.title}</td>
                        <td>
                            <div className='table-button-group'>
                                <button>
                                    <Link to={`/projects/detalis/${item._id}`}>
                                        View Project
                                    </Link>
                                </button>
                                <button onClick={() => deleteProjectHandler(item._id)}>Delete Project</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProjectsTable;
