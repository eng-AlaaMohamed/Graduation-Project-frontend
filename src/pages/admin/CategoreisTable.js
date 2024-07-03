import './usersTable.css';
import AdminSidebar from './AdminSidebar';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteCategory, fetchCategoreis } from '../../redux/apiCalls/categoryApiCall';


function CategoreisTable() {

  const dispatch = useDispatch();
  const { categoreis } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategoreis());
  }, []);

  //Delete Category Handler
    const deleteCategoryHandler = (categoryId) => {
  Swal.fire({  
    title: "هل انت متاكد من حذف التصنيف؟", 
    text: "عند حذف التصنيف لايمكنك استردادة", 
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonColor: '#3085d6',  
    cancelButtonColor: '#d33',  
    confirmButtonText: 'Yes!'   
  }).then((isOk) => {
    if(isOk) {
      dispatch(deleteCategory(categoryId));
    }
  })
  }

  return (
    <section className='table-container'>
      <AdminSidebar />
      <div className='table-wrapper'>
        <h1 className='table-title'>Categories</h1>
        <table className='the-table'>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Category Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {categoreis.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                            <b>{item.title}</b>
                        </td>
                        <td>
                            <div className='table-button-group'>
                                <button style={{backgroundColor: 'red'}} onClick={() => deleteCategoryHandler(item._id)}>Delete Category</button>
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

export default CategoreisTable;
