import './usersTable.css';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteProfile, getAllUsersProfile } from '../../redux/apiCalls/profileApiCall';


function UsersTable() {

    const dispatch = useDispatch();
    const { profiles, isProfileDeleted } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, [isProfileDeleted]);

//Delete User Handler
const deleteUserHandler = (userId) => {
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
            dispatch(deleteProfile(userId));
        }
        })
    }
    });
}

  return (
    <section className='table-container'>
      <AdminSidebar />
      <div className='table-wrapper'>
        <h1 className='table-title'>Users</h1>
        <table className='the-table'>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {profiles.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                            <div className='table-image'>
                                <img
                                    src={item.profilePhoto?.url}
                                    alt=''
                                    className='table-user-image'
                                />
                                <span className='table-username'>{item.username}</span>
                            </div>
                        </td>
                        <td>{item.email}</td>
                        <td>
                            <div className='table-button-group'>
                                <button>
                                    <Link to={`/profile/${item._id}`}>
                                        View Profile
                                    </Link>
                                </button>
                                <button onClick={() => deleteUserHandler(item._id)}>Delete User</button>
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

export default UsersTable;
