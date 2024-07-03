import { fetchProjects, fetchProjectsCount } from '../../redux/apiCalls/projectsApiCall';
import ProjectsList from '../../components/browesProjects/ProjectsList';
import SideBar from '../../components/sideBarToProjects/SideBar';
import { Pagination } from '../../components/indexComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './browseProjects.css';

const PROJST_PER_PAGE = 5;

function BrowseProjets() {
  const dispatch = useDispatch();
  const { projectsCount, projects } = useSelector(state => state.project);


  const [currntPage, setCurrntPage] = useState(1);
  const pages = Math.ceil(projectsCount / PROJST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchProjects(currntPage));
    window.scrollTo(0, 0)
  }, [currntPage])

  useEffect(() => {
    dispatch(fetchProjectsCount())
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='browse-project'>
      <div className='browse-project-content container-lg'>
        <div className='browse-project-page-title'>
          <h3>المشاريع</h3>
        </div>
        <div className='browes-project-layout'>
          <SideBar />
          <ProjectsList projects={projects} />
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

export default BrowseProjets;
