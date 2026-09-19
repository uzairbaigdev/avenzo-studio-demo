import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsappBtn from "./components/whatsappBtn/whatsappBtn";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import ServicesPage from "./pages/services/services";
import PricingPage from "./pages/pricing/pricing";
import Contact from "./pages/contact/contact";
import Review from "./pages/review/review";
import NotFound from "./pages/notFound/notFound";
import FAQ from "./pages/FAQ/FAQ";
import Global3DScene from "./components/Global3DScene";

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <Global3DScene />
      <ScrollToTop />
      <WhatsappBtn />
      <div className="relative z-10">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<Contact   />} />
        <Route path="/review" element={<Review />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>

  );
}