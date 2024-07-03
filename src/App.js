import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Home,
  AddProject,
  BrowseProjets,
  FreeLancers,
  Login,
  Signup,
  Category,
  ProjectDetalis,
  NotFoundPage,
  VerifyEmail,
  AdminDashboard,
  CategoryToUsers,
  ProjectInPortDetalis,
  ForgetPass,
  ResetPassword,
} from './pages/indexPages';

import { Header, Footer, UserProfile } from './components/indexComponents';
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';
import UsersTable from './pages/admin/UsersTable';
import ProjectsTable from './pages/admin/ProjectsTabl';
import CategoreisTable from './pages/admin/CategoreisTable';


function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <Router>
      <ToastContainer theme='colored' position='top-center' />
      <Header />
      <Routes>
        <Route path='/graduationproject' element={<Home />} />
        <Route path='/addproject' element={<AddProject />} />
        <Route path='/browseprojects/projects/categories/:category' element={<Category />} />
        <Route path='/projects/categories/:category' element={<Category />} />
        <Route path='/categories/:category' element={<CategoryToUsers />} />
        <Route path='/browseprojects' element={<BrowseProjets />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-dashboard/users-table' element={<UsersTable />} />
        <Route path='/admin-dashboard/projects-table' element={<ProjectsTable />} />
        <Route path='/admin-dashboard/categories-table' element={<CategoreisTable />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/forgetpassword' element={<ForgetPass />} />
        <Route path='/reset-password/:userId/:token' element={<ResetPassword />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/users/:userId/verify/:token' element={!user ? <VerifyEmail /> : <Navigate to='/' />} />
        <Route path='/profilefreelancers' element={<FreeLancers />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/projects/detalis/:id' element={<ProjectDetalis />} />
        <Route path='/projectInPortDetalis/:id' element={<ProjectInPortDetalis />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
