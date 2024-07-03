import { fetchUsersBasedOnCategory } from '../../redux/apiCalls/usersApiCall';
import { UserCategoryCard } from '../../components/indexComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './categoryToUsers.css';



const CategoryToUsers = () => {

    const dispatch = useDispatch();
    const { usersCate } = useSelector(state => state.user);

    const { category } = useParams();


    useEffect(() => {
        dispatch(fetchUsersBasedOnCategory(category));
        window.scrollTo(0, 0)
    }, [category])

    return (
        <div className='category-page'>
            <div className='category-page-content container-lg'>
                <h3 className='categort-title'>التخصص: <span>{category}</span></h3>
                {usersCate.length === 0 ?
                    <>
                        <h3 className='categort-not-found'>لا يوجد مستقلين</h3>
                    </>
                    :
                    <>
                        {usersCate.map(item => item.position === "businessOwner" ? '' : <UserCategoryCard userCategory={item} key={item._id} />)}
                    </>

                }
            </div>
        </div>
    )
}

export default CategoryToUsers;
