import { SpecialtiesSectionData, SpecialtiesCards } from '../../indexComponents';
import './specialties.css';


const Specialties = () => {

  const card = SpecialtiesSectionData.map( item => {
      return <SpecialtiesCards image = {item.image} title= {item.title} key={item.id} />
  } )

  return (
    <div className='section-4'>
    <div className='title'>اعثر على مستقلين محترفين في كافة المجالات</div>
    <p className='tip'>غطي احتياجاتك من المهارات في جميع التخصصات</p>
    <div className='section-content container-lg'>
      { card }
    </div>
    </div>
  )
}

export default Specialties;
