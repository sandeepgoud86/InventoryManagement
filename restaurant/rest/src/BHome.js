import Navbar from './Navbar.jsx';
import ServiceSection from './BComponents/Services/ServiceSection';
import SurveySection from './BComponents/Survey/SurveySection';
import ContactSection from './BComponents/Contact/ContactSection';
import Homeee from "./Homeee.jsx";
import Footer from './components/Footer/Footer';


function BHome() {
  return (
    <>
      <Navbar />
      <br/> <br/> <br/> <br/>
        <div id="home">
          <Homeee />
        </div>

        
      <ServiceSection />
      <SurveySection />
      <ContactSection />
      <Footer/>

    </>
  );
}

export default BHome;
