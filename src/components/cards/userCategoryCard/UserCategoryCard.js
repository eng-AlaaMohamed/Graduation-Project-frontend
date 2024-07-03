import { Link, useParams } from 'react-router-dom';
import './userCategoryCard.css';


const UserCategoryCard = ({ userCategory }) => {

  const { category } = useParams();

  return (
    <>
      {
        userCategory?.category === category ?

          <Link to={`/profile/${userCategory._id}`} className='user-card-link'>

            <div className='header-card'>

              <div className='pic-and-name'>
                <img className='user-image' src={userCategory.profilePhoto?.url} alt='user Image' />
                <span className='username'>{userCategory.username}</span>
              </div>

              <div className='job-title'>المسمي الوظيفي: <span>{userCategory.bio}</span></div>

            </div>

            <p className='description'>
              {userCategory.description}
            </p>
          </Link>
          :
          ""
      }
    </>
  )
}

export default UserCategoryCard;
