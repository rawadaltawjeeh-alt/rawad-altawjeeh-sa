import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import TargetGroups from "../components/TargetGroups";
import Testimonials from "../components/Testimonials";
import JoinForm from "../components/JoinForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="font-tajawal bg-background min-h-screen w-full overflow-x-hidden">
      <div id="navbar">
        <Navbar />
      </div> 

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="how">
        <HowItWorks />
      </div>

      <div id="groups">
        <TargetGroups />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="join">
        <JoinForm />
      </div>

      <Footer />

      <div id="footer"></div>
    </div>
  );
};

export default Index;
