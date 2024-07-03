import { getAllUsersProfile } from '../../redux/apiCalls/usersApiCall';
import { getUsersCount } from '../../redux/apiCalls/profileApiCall';
import { SideBarToUsers } from '../../components/indexComponents';
import UserCard from '../../components/cards/userCard/UserCard';
import { Pagination } from '../../components/indexComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './freeLancer.css';


const USER_PER_PAGE = 10;

function FreeLancers() {

  const dispatch = useDispatch();

  const { users } = useSelector(state => state.user);
  const { usersCount } = useSelector(state => state.profile);

  const [currntPage, setCurrntPage] = useState(1);
  const pages = Math.ceil(usersCount / USER_PER_PAGE);

  let user = users.map(user => {
    return <UserCard user={user} key={user._id} />
      ;
  })

  useEffect(() => {
    dispatch(getAllUsersProfile(currntPage));
    window.scrollTo(0, 0);
  }, [currntPage]);

  useEffect(() => {
    dispatch(getUsersCount());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='free-lancers-page'>
      <div className='page-content container-lg'>
        <div className='title-page'>
          <h2>المستقلين:</h2>
        </div>
        <div className='freelancer-layout'>
          <SideBarToUsers />
          <div className='user-card'>{user}</div>
        </div>
        <Pagination
          pages={pages}
          currntPage={currntPage}
          setCurrntPage={setCurrntPage}
        />
      </div>
    </div>
  )
}

export default FreeLancers;
