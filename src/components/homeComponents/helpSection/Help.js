import { HelpCards, HelpSectionData } from '../../indexComponents';
import './help.css';

const Help = () => {

  const card = HelpSectionData.map(card => {
    return <HelpCards key={card.id} icon={card.icon} title={card.title} des={card.des} />
  })

  return (
    <div className='section-2'>
      <div className='title'>كيف يساعدك بعيد على إنجاز أعمالك</div>
      <div className='section-content container-lg'>
        {card}
      </div>
    </div>
  )
}

export default Help;
