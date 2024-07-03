import { useRef, useEffect } from 'react';
import './scrollToTop.css';

const ScrollToTop = () => {

    const toUp = useRef();
    //Scroll To Top
    useEffect( () => {
  
      const element = toUp.current;
  
      window.addEventListener('scroll', () => {
        if (window.scrollY > 800 ) {
          element.style.right = '15px'
        } else {
          element.style.right = '-45px'
        }
      })
    }, [])

  return (
    <div onClick={() => { window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} ref={toUp} className='toUp'>
         <i className="bi bi-chevron-double-up"></i>
    </div>
  )
}

export default ScrollToTop;
