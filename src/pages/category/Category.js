import { fetchProjectsBasedOnCategory } from '../../redux/apiCalls/projectsApiCall';
import ProjectsList from '../../components/browesProjects/ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './category.css';



const Category = () => {
    const dispatch = useDispatch();
    const { projectsCate } = useSelector(state => state.project)

    const { category } = useParams();


    useEffect(() => {
        dispatch(fetchProjectsBasedOnCategory(category));
        window.scrollTo(0, 0)
    }, [category])

    return (
        <div className='category-page'>
            <div className='category-page-content container-lg'>
                <h3 className='categort-title'>التصنيف: <span>{category}</span></h3>
                {projectsCate.length === 0 ?
                    <>
                        <h3 className='categort-not-found'>لا يوجد مشاريع متاحه</h3>
                    </>
                    :
                    <>
                        <ProjectsList projects={projectsCate} />
                    </>

                }
            </div>
        </div>
    )
}

export default Category;
