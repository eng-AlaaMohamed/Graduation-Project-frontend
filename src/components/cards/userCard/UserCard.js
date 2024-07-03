import { Link } from 'react-router-dom';
import './userCard.css';


const UserCard = ({ user }) => {

  return (
    <>
      {
        user.position === "businessOwner" ?
          ""
          :
          <Link to={`/profile/${user._id}`} className='user-card-link'>

            <div className='header-card'>

              <div className='pic-and-name'>
                <img className='user-image' src={user.profilePhoto?.url} alt='user Image' />
                <span className='username'>{user.username}</span>
              </div>

              <div className='job-title'>المسمي الوظيفي: <span>{user.bio}</span></div>

            </div>

            <p className='description'>
              {user.description}
            </p>
          </Link>
      }
    </>
  )
}

export default UserCard;
