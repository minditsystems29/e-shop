import Header from '../components/layout/Header';
import Banner from '../components/home/Banner';
import Carousel from '../components/home/Carousel';
import Footer from '../components/layout/Footer';
import './globals.css'
const Home = () => {

  return (
    <div>
      <Header/>
      <Banner />
      <Carousel />
      <Footer/>
    </div>
  );
};

export default Home;
