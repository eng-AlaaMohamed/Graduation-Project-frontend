import { ApplicantCard } from '../indexComponents';
import './applicantList.css';



const ApplicantList = ({ applicants }) => {

  const usersApplicant = applicants?.map(applicant => {
    return <ApplicantCard applicant={applicant} key={applicant._id} />;
  });

  return (
    <div className='applicant-list'>
      {usersApplicant}
    </div>
  )
}

export default ApplicantList;
