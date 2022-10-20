import { Routes, Route } from "react-router-dom";


import './App.css';
import Navbar from './component/Navbar';
import Home from "./page/Home";
import Signup from "./page/Signup";
import ContactUs from "./page/ContactUs";
import Faq from "./page/Faq";
import Seachjobs from "./page/Seachjobs";


function App() {
  return (
    <>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/jobseeker/signup" element={<Signup usertype="applicant" />} />
          <Route path="/employer/signup" element={<Signup usertype="employer" />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/search" element={<Seachjobs />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
