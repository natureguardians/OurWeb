import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Contact from "./components/contact";
import About from "./components/about";
import Nav from "./components/nav";
import Blogs from "./components/blogs";
import BlogList from "./components/blogList";
import BlogDetails from "./components/blogDetails";
import ContactForm from "./components/contact";



const App = () => {
  return ( 
    <Router>
      <div className="cont">
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contacts" element={<ContactForm />} />
        </Routes>
        
      </div>
      
    </Router>
  );
}

export default App;
