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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <WhatsappBtn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<Contact   />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>

  );
}