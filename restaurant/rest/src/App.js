// import React from 'react'
// import {Routes, Route} from 'react-router-dom'
// import Home from './pages/Home/AfterHome.js'
// import Menu from './pages/Menu/Menu'
// import Delivery from './pages/Delivery/Delivery'
// import About from './pages/About/About'
// import Contact from './pages/Contact/Contact'
// import Faq from './Faq'
// import BHome from './BHome'
// import Homeee from "./Homeee.jsx";
// import Signup from './Signup.js'
// import Signin from './Signin.js'
// import AddtoCart from './AddtoCart.js'
// import AfterHome from './pages/Home/AfterHome.js'
// import UserProfile from './Profile/PAGES/user/UserProfile.js'

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<BHome />} />
//         <Route path="/AfterHome" element={<AfterHome />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/delivery" element={<Delivery />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/Faq" element={<Faq />} />
//         <Route path="/Homeee" element={<Homeee />} />
//         <Route path="/Faq" element={<Faq />} />
//         <Route path="/Faq" element={<Faq />} />
//         <Route path="/Faq" element={<Faq />} />
//         <Route path="Signup" element={<Signup/>}/>
//         <Route path="Signin" element={<Signin/>}/>
//         <Route path="/menu/AddtoCart" element={<AddtoCart/>}/>
//         <Route path='/UserProfile' element={<UserProfile />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;



import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import BHome from './BHome';
import AfterHome from './pages/Home/AfterHome';
import Menu from './pages/Menu/Menu';
import Delivery from './pages/Delivery/Delivery';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Faq from './Faq';
import Homeee from './Homeee.jsx';
import Signup from './Signup.js';
import Signin from './Signin.js';
import AddtoCart from './AddtoCart.js';
import UserProfile from './Profile/PAGES/user/UserProfile.js';
import SellingReport from './SellingReport.js';
import FeedbackReport from './FeedbackReport.js';
import FeedbackForm from './FeedbackForm.js';
import Drivers from './Drivers.js';
import Stats from './Stats.js';
import Notification from './Notification.js';
import Login from './Admin/pages/login/Login.jsx';
import List from './Admin/components/table/Table.jsx';
import Single from './Admin/pages/single/Single.jsx';
import New from './Admin/pages/new/New.jsx';
import Home from "./Admin/pages/home/Home.jsx";
import { DarkModeContext } from "./Admin/context/darkModeContext.js";
import { productInputs, userInputs } from "./formSource";
import AdminSignin from "./AdminSignin.js";
import Itemcard from "./Itemcard.js";
import Cart from "./Cart.js";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <RecoilRoot> 
      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
          <Route path="/" element={<BHome />} />
          <Route path="/AfterHome" element={<AfterHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Homeee" element={<Homeee />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/menu/AddtoCart" element={<AddtoCart />} />
          <Route path="/UserProfile" element={<UserProfile />} /> 
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="SellingReport" element={<SellingReport />} />
          <Route path="Home/FeedbackReport" element={<FeedbackReport />} /> 
          <Route path="FeedbackForm" element={<FeedbackForm />} /> 
          <Route path="Drivers" element={<Drivers />} /> 
          <Route path="/Home/Stats" element={<Stats/>} /> 
          <Route path="/Notification" element={<Notification />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/AdminSignin" element={<AdminSignin />} />
          <Route path="/List" element={<List />}/>
          <Route path="Itemcard" element={<Itemcard />}>
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
          </Route>
          <Route path="products" element={<List />}>
            <Route path=":productId" element={<Single />} />
            <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} />
            </Route>
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
