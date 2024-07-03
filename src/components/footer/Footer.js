import Paypal from '../../images/paypal.png';
import Visa from '../../images/visa.png';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <p>© 2023. All rights reserved</p>
        <div className='payment '>
          <img src={Visa} alt='Visa' />
          <img src={Paypal} alt='Paypal' />
        </div>
        <p className='arabic'>© 2023. جميع الحقوق محفوظة</p>
    </div>
  )
}

export default Footer
