import "./sidebar.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";


const Sidebar = ({ active, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
 
  return (
    <aside className={`sidebar ${active}`}>
      {loading && (
        <div className="overlay">
          <FiLoader className="loading-spinner" />
          <p className="loading-text">Logging out...</p>
        </div>
      )}
      <div className="top">
        <h3>Jobs4life</h3>
        <div className="close_btn">&times;</div>
      </div>

      <div className="middle">
        <Link
          onClick={() => setActiveItem("home")}
          className={activeItem === "home" ? "link active" : "link"}
          to="/dashboard"
        >
          <IoHome className="icon" />
          <span>Home</span>
        </Link>

      
      </div>

    </aside >
  );
};

export default Sidebar;
