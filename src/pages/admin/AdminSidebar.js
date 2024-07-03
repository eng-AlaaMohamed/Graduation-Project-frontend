import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return ( 
    <div className='admin-sidebar'>
        <Link to='/admin-dashboard' className='admin-sidebar-title'>
          <i className='bi bi-columns'></i>
          لوحة التحكم
        </Link>
        <ul className='admin-dashboard-list'>
          <Link className='admin-sidebar-link' to='/admin-dashboard/users-table'>
            <i className='bi bi-person'></i>
            المستخدمين
          </Link>
          <Link className='admin-sidebar-link' to='/admin-dashboard/projects-table'>
            <i className='bi bi-tag-fill'></i>
            المشاريع
          </Link>
          <Link className='admin-sidebar-link' to='/admin-dashboard/categories-table'>
            <i className='bi bi-file-post'></i>
            التصنيفات
          </Link>
        </ul>
    </div>
   )
}

export default AdminSidebar;
