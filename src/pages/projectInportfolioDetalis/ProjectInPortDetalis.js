import { fetchSinglePortfolio, updatePortfolioImage } from '../../redux/apiCalls/portfolioApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './projectInPortDetalis.css';
import { RotatingLines } from 'react-loader-spinner';


const ProjectInPortDetalis = () => {

  const dispatch = useDispatch();
  const { portfolios, loading } = useSelector(state => state.portfolio);
  const { profile } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  const [file, setFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePortfolio(id));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Update Image submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.warning('لم يتم اختيار صوره');

    const formData = new FormData();
    formData.append("image", file);

    dispatch(updatePortfolioImage(formData, portfolios?._id));
  }

  return (
    <div className="project-in-port-detalis">
      <div className="project-in-port-detalis-content container-lg">
        <h1 className='project-in-port-detalis-title'>تفاصيل العمل</h1>
        <div className='title-and-image'>
          <div className='image'>
            <img src={file ? URL.createObjectURL(file) : portfolios?.image?.url} alt="" />
            {user?.id === profile?.id && (
              <form onSubmit={updateImageSubmitHandler} className='update-portfolio-image'>
                <label htmlFor='file' className='update-portfolio-label'>
                  <i className='bi bi-image-fill'></i>
                  تعديل الصورة
                </label>
                <input
                  style={{ display: "none" }}
                  type='file'
                  name='file'
                  id='file'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type='submit'>
                  {loading ?
                    <RotatingLines
                      visible={true}
                      height="20"
                      width="20"
                      strokeColor="blue"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                    :
                    "تحميل"
                  }
                </button>
              </form>)}
          </div>
          <h2 className='title'>{portfolios?.title}</h2>
        </div>
        <div className='description'>{portfolios?.description}</div>
        <div className='project-link'>
          {
            portfolios?.projectLink ?
              <Link to={portfolios?.projectLink}>
                <FaLink style={{marginLeft: '8px'}} />
                رابط المشروع
              </Link>
              :
              <div className='not-found-projectlink'>لا يوجد رابط للمشروع</div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectInPortDetalis;
