import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../redux/apiCalls/categoryApiCall';


function AddCategoryForm() {

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("اسم التصنيف مطلوب");

    dispatch(createCategory({ title }));
    setTitle("");
  }

  return (
    <div className='add-category'>
      <h6 className='add-category-title'>اضف تصنيف جديد:</h6>
      <form onSubmit={formSubmitHandler}>
        <div className='add-category-form-group'>
          <label htmlFor='title'>اسم التصنيف</label>
          <input
            type='text'
            id='title'
            placeholder='ادخل اسم التصنيف'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type='submit' className='add-category-btn'>اضافة</button>
        </div>
      </form>
    </div>
  )
}

export default AddCategoryForm;
