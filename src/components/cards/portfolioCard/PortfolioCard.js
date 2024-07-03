import UpdatePortfolioModel from '../../updatePortfolioModel/UpdatePortfolioModel';
import { deletePortfolio } from '../../../redux/apiCalls/portfolioApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './portfolioCard.css';


function PortfolioCard({project}) {

  const [openUpdatePortfolio, setOpenUpdatePortfolio] = useState(false);

  const dispatch = useDispatch();
  const { isPortfolioDeleted } = useSelector( state => state.portfolio);
  const {  profile } = useSelector( state => state.profile);
  const { user } = useSelector( state => state.auth);

  //Delete Project Handler
  const deletePortfolioHandler = () => {
    Swal.fire({
      title: "هل انت متاكد من حذف العمل؟",
      text: "!اذا قمت بحذف العمل لا يمكنك استردادة",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف العمل.",
          icon: "success"
        }).then((result) => {
          if(result.isConfirmed) {
            dispatch(deletePortfolio(project?._id));
          }
        })
      }
    });
  }

  useEffect( () => {
    if(isPortfolioDeleted) {
      window.location.reload();
    }
  }, [isPortfolioDeleted]);
  
  return (
    <>
        <div className="portfolio-card">
          <img className="portfolio-card-image" src={project?.image.url} alt=""/>
          <div className="title">{project?.title}</div>
          <Link className="portfolio-card-btn"  to={`/projectInPortDetalis/${project._id}`} >انقر للتفاصيل</Link>
          {user?.id === profile?.id && (
          <div className='portfolio-card-icon'>
            <i onClick={() => setOpenUpdatePortfolio(true)} className='bi bi-pencil-square update'></i>
            <i onClick={deletePortfolioHandler} className='bi bi-trash-fill delete'></i>
          </div>)}
          { openUpdatePortfolio && (
          <UpdatePortfolioModel
            projectId={project?._id}
            projectTitle={project?.title}
            projectDescription={project?.description} 
            ProjectLink={project?.projectLink}
            setOpenUpdatePortfolio={setOpenUpdatePortfolio}
          />)}
        </div>
    </>
  )
}

export default PortfolioCard;
