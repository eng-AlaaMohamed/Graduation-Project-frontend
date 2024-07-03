import './helpCards.css';

const HelpCards = (props) => {
  return (
    <div className='box'>
        <i className={props.icon}></i> 
        <div className='text'>
        <h4>{props.title}</h4>
        <p>{props.des}</p>
        </div>
    </div>
  )
}

export default HelpCards;
