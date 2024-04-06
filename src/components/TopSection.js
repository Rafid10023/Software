import { useState } from "react";
import MenuExpandIcon from '../icons/MenuExpand.png';
import UserIcon from '../icons/userIcon.png';
import "../components/TopSection.css";
import Sidebar from "../components/Sidebar.js";
import { CSSTransition } from "react-transition-group";

const TopSection = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLabelClick = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
      <>
        <div className="leftSection">
          {/* Additional JSX added here */}
          <div className={`top ${isSidebarOpen ? "top-sidebar-open" : ""}`}>
            <div className="menu">
              <input type="checkbox" name="checkbox" id="check" />
              <label htmlFor="check" onClick={handleLabelClick}>
                <img src={MenuExpandIcon} alt="Menu Expand" className="menuIcon" />
              </label>
            </div>
          </div>
          {/* End of additional JSX */}
          <span className="welcomeText">Welcome Back, JJ!</span>
          <div className="userInfo">
            <span className="userName">Jai Joshi</span>
            <img src={UserIcon} alt="User Icon" className="userIcon" />
            <div class="dropdown-content" id="dropdownContent">
              <a href="#" onclick="signOut()">Sign Out</a>
            </div>
          </div>
        </div>
  
        {/* Sidebar Transition */}
        <CSSTransition
          in={isSidebarOpen}
          timeout={500}
          classNames="sidebar"
          unmountOnExit
        >
          <Sidebar />
        </CSSTransition>
      </>
    );
  };

export default TopSection;