import { NavBar } from '../../components/NavBar';
import { Hero } from '../../components/Hero';
import { Features } from '../../components/Features';
import { Testimonials } from '../../components/Testimonials';
import { CTA } from '../../components/CTA';
import { Footer } from '../../components/Footer';

const LandingPage= () => {
  return (

    <div className="min-h-screen bg-[#00111c] font-inter text-white">
     <NavBar/>
     <Hero/>
     <Features/>
     <Testimonials/>
     <CTA/>
     <Footer/>
    </div>
  );
};

export default LandingPage;
