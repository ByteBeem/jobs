import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import  WebcamCapture from "../../components/WebcamCapture";
import "./Home.scss";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false 
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }));
  };

  render() {
    const { showSidebar, active, closeSidebar } = this.props;
    const { isSidebarOpen } = this.state;

    return (
      <div className="home">
        <Sidebar active={active} closeSidebar={closeSidebar} />
        <div className="home_container">
          <Navbar showSidebar={showSidebar} />
          <div className="content">
            <div className="jobs_application">
            <WebcamCapture />
            </div>
          </div>
        </div>
        <footer className={`footer ${isSidebarOpen ? "above-sidebar" : ""}`}>
          <p>See someone's real identity , Scan different faces and know your surroundings. Face4life.co.za does the job!</p>
        </footer>
      </div>
    );
  }
}

export default Home;
