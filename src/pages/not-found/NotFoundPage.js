import './notFoundPage.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <selection className='not-found'>
        <div className='not-found-title'>404</div>
        <h1 className='not-found-text'>هذه الصفحه غير موجوده</h1>
        <Link className='not-found-link' to='/'>اذهب الي الصفحه الرئيسية</Link>
    </selection>
  )
}

export default NotFoundPage;
