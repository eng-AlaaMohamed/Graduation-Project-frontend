import AdminMain from './AdminMain';
import AdminSidebar from './AdminSidebar';
import './adminPage.css';



const AdminDashboard = () => {
  return (
    <section className='admin-dashboard'>
      <AdminSidebar />
      <AdminMain />
    </section>
  )
}

export default AdminDashboard;
