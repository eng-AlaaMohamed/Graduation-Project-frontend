import { fetchCategoreis } from '../../redux/apiCalls/categoryApiCall';
import { registerUser } from '../../redux/apiCalls/authApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import './signUp.css';



function Signup() {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const radio = useRef();


  const dispatch = useDispatch();

  const { registerMessage } = useSelector(state => state.auth);
  const { categoreis } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategoreis())
  }, []);

  //Handelar Cahnge Input Radio
  const handleCahngeInputRadio = (e) => {
    const { value } = e.target;
    setPosition(value);
  }


  //From Submet Handelar
  const fromSubmetHandelar = (e) => {
    e.preventDefault();

    if (username.trim() === "") return toast.error('الاسم مطلوب');
    if (email.trim() === "") return toast.error('الايميل مطلوب');
    if (password.trim() === "") return toast.error('الرقم السري مطلوب');
    if (bio.trim() === "") return toast.error('الوصف الوظيفي مطلوب');
    if (description.trim() === "") return toast.error('النبذه التعريفيه مطلوبه');
    if (category.trim() === "") return toast.error('تحديد القسم مطلوب');
    if (position.trim() === "") return toast.error('هذا الحقل مطلوب');

    dispatch(registerUser({ username, email, password, position, bio, description, category }));
  }

  const navigate = useNavigate()

  if (registerMessage) {
    Swal.fire({
      title: registerMessage,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(isOk => {
      if (isOk) {
        //go to login page
        navigate('/login');
      }
    })
  }


  return (
    <div className='signUp-page'>
      <div className='signUp-content'>
        <div className='text'>
          <h1 className='title'>مرحبا !</h1>
          <p>هل لديك حساب مسبق ؟</p>
          <Link to='/login'>دخول</Link>
        </div>
        <form onSubmit={fromSubmetHandelar} className='form'>

          <h2 className='title'>انشاء حساب جديد</h2>

          <label htmlFor='name'>الاسم</label>
          <input
            id='name'
            type='text'
            placeholder='اكتب اسمك باللغه العربيه'
            onChange={(e) => { setUserName(e.target.value) }}
          />

          <label htmlFor='email'>البريد الإلكتروني </label>
          <input
            id='email'
            type='email'
            placeholder='ادخل البريد الالكتروني الخاص بك'
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <label htmlFor='pass'>كلمة المرور</label>
          <input
            id='pass'
            type='password'
            placeholder='ادخل كلمة المرور الخاصة بك'
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <div className='bio'>
            <label htmlFor='bio'>الوصف الوظيفي</label><br />
            <input
              type='text'
              id='bio'
              placeholder='اكتب المسمي الوظيفي'
              onChange={(e) => { setBio(e.target.value) }}
            />
          </div>

          <div className='about-your-self'>
            <label htmlFor='textarea'>نبذه تعريفيه عنك</label>
            <textarea
              id='textarea'
              placeholder='اكتب نبذه تعريفيه عنك'
              onChange={(e) => { setDescription(e.target.value) }}
            ></textarea>
          </div>

          <select
            className='selsct-box'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">حدد القسم</option>
            {
              categoreis?.map(category =>
                <option key={category._id} value={category.title}>{category.title}</option>
              )
            }
          </select>

          <div className='position-job'>
            <div style={{ fontWeight: "bold", margin: "0 0 10px" }} htmlFor='position'>تسجيل ك</div>

            <div className='input-radio' onChange={handleCahngeInputRadio}>
              <div>
                <input style={{ marginLeft: '5px', width: "fit-content" }} type="radio" id="businessOwner" ref={radio} name="po" value="businessOwner" />
                <label style={{ fontWeight: "normal" }} htmlFor='businessOwner'>صاحب عمل</label>
              </div>

              <div>
                <input style={{ marginLeft: '5px', width: "fit-content" }} type="radio" id="freeLancer" ref={radio} name="po" value="freeLancer" />
                <label style={{ fontWeight: "normal" }} htmlFor='freeLancer'>مستقل</label>
              </div>
            </div>

          </div>


          <button type='submet'>تسجيل</button>
          <div className='i-have-acc'>هل لديك حساب؟<Link to='/login'>دخول</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
