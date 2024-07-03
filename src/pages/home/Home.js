import { Hero, Steps, Help, Security, Specialties, Questions, Started, ScrollToTop } from '../../components/indexComponents';
import './home.css';

function Home() {
  return (
    <div className='home'>
      <Hero />
      <Steps />
      <Help />
      <Security />
      <Specialties />
      <Questions />
      <Started />
      <ScrollToTop />
    </div>
  )
}

export default Home;
