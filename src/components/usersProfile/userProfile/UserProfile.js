import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../../redux/apiCalls/profileApiCall";
import BusinessOwner from '../../usersProfile/businessOwner/BusinessOwner';
import { PortfolioCard, UpdateProfileModel } from "../../indexComponents";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import AddProjectToPortfolio from "./AddProjectToPortfolio";
import { RotatingLines, Oval } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineMailOutline } from "react-icons/md";
import { FcBriefcase } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import "./userProfile.css";


const UserProfile = () => {

  const [updateProfile, setUpdateProfile] = useState(false);
  const [openAddProjectToPortfolio, setOpenAddProjectToPortfolio] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, loadingDelete, isProfileDeleted } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  const emailUser = profile?.email;

  const [file, setFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id))
  }, [id])

  //form submet handler
  const formSubmetHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('اضف ملف صالح');

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  //Delete Account Handler
  const deleteAccountHandler = () => {
    Swal.fire({
      title: "هل انت متاكد من حذف الحساب؟",
      text: "عند حذف الحساب لا يمكنك استرداده!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(user?.id));
        dispatch(logoutUser());
      }
    });
  };

  useEffect(() => {
    if (isProfileDeleted) {
      navigate('/')
    }
  }, [navigate, isProfileDeleted]);

  if (loadingDelete) {
    return (
      <div>
        <Oval
          visible={true}
          height="120"
          width="120"
          color="black"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  }

  return (
    <>
      {
        profile?.position === 'businessOwner' ?
          <BusinessOwner />
          :
          <div className='user-profile'>
            <div className='user-profile-content container-lg'>
              {/* User Profile Header */}
              <div className='user-profile-header'>
                {/* User image */}
                <div className='user-image'>
                  <img className='profile-image' src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt='image' />

                  {user?.id === profile?.id && (
                    <form onSubmit={formSubmetHandler}>
                      <label
                        htmlFor="file"
                        className='bi bi-camera-fill upload-profile-photo' >
                      </label>
                      {/* </abbr> */}
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        name='file'
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <button className='upload-profile-photo-btn' type='submit'>
                        {loading ?
                          <RotatingLines
                            visible={true}
                            height="20"
                            width="20"
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                          />
                          :
                          "upload"
                        }
                      </button>
                    </form>
                  )}

                </div>

                {/* Username & Data */}
                <div className='user-name-and-data'>
                  <h1 style={{ fontFamily: '"Open Sans", sans-serif' }} className='profile-username'>{profile?.username}</h1>
                  <p className='profile-bio'>
                    {profile?.bio}
                    <FcBriefcase style={{ marginRight: "5px" }} />
                  </p>
                  <div className='user-data-joined'>
                    <strong>تاريخ الانضمام: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                  </div>

                  {user?.id === profile?.id && (
                    <button onClick={() => setUpdateProfile(true)} className='update-profile-btn'>
                      <i className='bi bi-file-person-fill'></i>
                      تحديث البيانات
                    </button>
                  )}

                </div>
              </div>

              <div className='profile-content'>
                <div className='profile-project-list'>
                  <div className="profile-project-list-header">
                    <div className="project-list-tile">الاعمال:</div>
                    {user?.id === profile?.id && (
                      <button onClick={() => setOpenAddProjectToPortfolio(true)} className='add-project-btn'>
                        <i className='bi bi-file-plus-fill'></i>
                        اضافة عمل
                      </button>
                    )}
                  </div>
                  <div className="portfolio-layout">
                    {
                      profile?.portfolio?.length > 0 ?
                        profile?.portfolio?.map(projects =>
                          <PortfolioCard
                            key={projects._id}
                            project={projects}
                          />
                        )
                        :
                        <h4 className="not-found-work">لا يوجد اعمال</h4>
                    }
                  </div>
                </div>

                <div className='profile-info'>
                  <div className='profile-info-title'>معلومات شخصيه:</div>
                  <div className='profile-info-content'>
                    <h5 className='description-title'>الوصف:</h5>
                    <p className='description'>
                      {profile?.description}
                    </p>
                    <h5 className='our-project-count'>
                      الاعمال: <span>{profile?.portfolio?.length}</span>
                    </h5>
                    {user ?
                      <div className='contact-me'>
                        <div className='icon-media' onClick={() => { window.location.href = `mailto:${emailUser}` }} >
                          <h4 className='contact-me-title'>تواصل معي</h4>
                          <MdOutlineMailOutline className='email-icon' />
                        </div>
                      </div>
                      :
                      <div className="go-to-login">
                        قم بالتسجيل في الموقع للتواصل
                      </div>
                    }

                  </div>
                </div>

              </div>

              {updateProfile && (
                <UpdateProfileModel setUpdateProfile={setUpdateProfile} profile={profile} />
              )}

              {openAddProjectToPortfolio && (
                <AddProjectToPortfolio setOpenAddProjectToPortfolio={setOpenAddProjectToPortfolio} />
              )}
              {user?.id === profile?._id && (
                <div className="delete-account">
                  <div onClick={deleteAccountHandler} className="delete-account-btn">حذف الحساب</div>
                </div>
              )}
            </div>
          </div>
      }
    </>
  )
}

export default UserProfile;
