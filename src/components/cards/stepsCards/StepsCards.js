import './stepsCards.css';

const StepsCards = (props) => {
  return (
    <div className='block'>
        <div className='info'>
        <h4><i className={props.iconTitle}></i>{props.title}</h4>
        <p>{props.des}</p>
        </div>
        <div className='icon'>
        <i className={props.icon}></i>
        </div>
    </div>
  )
};

export default StepsCards;
