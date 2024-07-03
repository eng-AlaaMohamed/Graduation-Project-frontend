import { StepsCards, StepsSectionData } from '../../indexComponents';
import './steps.css';

const Steps = () => {

  const card = StepsSectionData.map(card => {
    return <StepsCards key={card.id} iconTitle={card.iconInTitle} title={card.title} des={card.des} icon={card.icon} />
  })

  return (
    <div className='section-1' id='section-1'>
      <div className='title'>هل لديك عمل تريد إنجازه</div>
      <div className='section-content container-lg'>
        <div className='text'>
          {card}
        </div>
      </div>
    </div>
  )
}

export default Steps;
