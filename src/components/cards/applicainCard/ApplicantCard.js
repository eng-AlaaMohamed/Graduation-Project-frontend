import { Link } from 'react-router-dom';
import './applicantCard.css';


const ApplicantCard = ({ applicant }) => {

  return (
    <>
      {
        applicant?.position === "businessOwner" ?
          ""
          :
          <Link to={`/profile/${applicant?.user}`} className='applicantCard-link'>

            <div className='header-card'>

              <div className='pic-and-name'>
                <img className='user-image' src={applicant?.profilePhoto?.url} alt='user Image' />
                <span className='username'>{applicant?.username}</span>
              </div>

              <div className='job-title'>المسمي الوظيفي: <span>{applicant?.bio}</span></div>

            </div>

            <p className='description'>
              {applicant?.description}
            </p>
          </Link>
      }
    </>
  )
}

export default ApplicantCard;
