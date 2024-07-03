import { Link } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchCategoreis } from '../../redux/apiCalls/categoryApiCall';
import { getUsersCount } from '../../redux/apiCalls/profileApiCall';
import { fetchProjectsCount } from '../../redux/apiCalls/projectsApiCall';


function AdminMain() {

  const dispatch = useDispatch();
  const { categoreis } = useSelector(state => state.category);
  const { usersCount } = useSelector(state => state.profile);
  const { projectsCount } = useSelector(state => state.project);

  useEffect(() => {
    dispatch(fetchCategoreis());
    dispatch(getUsersCount());
    dispatch(fetchProjectsCount())
  }, [])

  return (
    <div className='admin-main'>
      <div className='admin-main-header'>
        <div className='admin-main-card'>
          <h5 className='admin-card-title'>المستخدمين</h5>
          <div className='admin-card-count'>{usersCount}</div>
          <div className='admin-card-link-wrapper'>
            <Link to='/admin-dashboard/users-table' className='admin-card-link'>
              شاهد المستخدمين
            </Link>
            <div className='admin-card-icon'>
              <i className='bi bi-person'></i>
            </div>
          </div>
        </div>
        <div className='admin-main-card'>
          <h5 className='admin-card-title'>المشاريع</h5>
          <div className='admin-card-count'>{projectsCount}</div>
          <div className='admin-card-link-wrapper'>
            <Link to='/admin-dashboard/projects-table' className='admin-card-link'>
              شاهد المشاريع
            </Link>
            <div className='admin-card-icon'>
              <i className='bi bi-file-post'></i>
            </div>
          </div>
        </div>
        <div className='admin-main-card'>
          <h5 className='admin-card-title'>التصنيفات</h5>
          <div className='admin-card-count'>{categoreis.length}</div>
          <div className='admin-card-link-wrapper'>
            <Link to='/admin-dashboard/categories-table' className='admin-card-link'>
              شاهد التصنيفات
            </Link>
            <div className='admin-card-icon'>
              <i className='bi bi-tag-fill'></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  )
}

export default AdminMain;
