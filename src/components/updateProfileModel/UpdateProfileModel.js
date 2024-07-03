import { updateProfile } from '../../redux/apiCalls/profileApiCall';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './updateProfileModel.css';



const UpdateProfileModel = ({setUpdateProfile, profile}) => {

    const dispatch = useDispatch();
  
    const [username, setUsername] = useState(profile?.username);
    const [bio, setBio] = useState(profile?.bio);
    const [description, setDescription] = useState(profile?.description);
    const [password, setPassword] = useState('');

    //Form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const ubdatedUser = { username, bio, description };
        
        if(password.trim() !== ''){
            ubdatedUser.password = password;
        };

        dispatch(updateProfile(profile?._id, ubdatedUser));
        setUpdateProfile(false);
        window.location.reload();
    };

  return (
    <div className='update-profile'>
        <form onSubmit={formSubmitHandler} className='update-profile-form'>
                <abbr title='close'>
                    <i
                     className='bi bi-x-circle-fill update-profile-form-close'
                     onClick={() => setUpdateProfile(false)}
                     ></i>
                </abbr>
                <h1 className='update-profile-title'>تعديل الحساب</h1>
                <input
                    type='text' 
                    className='update-profile-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username'
                />
                <input
                    type='text' 
                    className='update-profile-input'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder='bio'
                />
                <textarea
                    type='text' 
                    className='update-profile-texterea'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='decription'
                />
                <button type='submit' className='update-profile-btn'>
                    تعديل
                </button>
        </form>
    </div>
  )
}

export default UpdateProfileModel;
