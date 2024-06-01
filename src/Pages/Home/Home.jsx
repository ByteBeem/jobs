import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
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
              <h2 className="application_title">Apply for Job Assistance</h2>
              <ol className="application_steps">
                <li className="step">
                  <span className="step_number">1.</span> Ensure you have valid WhatsApp account.
                </li>
                <li className="step">
                  <span className="step_number">2.</span> Click the "Jobhunt" button at the top right corner.
                </li>
                <li className="step">
                  <span className="step_number">3.</span> Fill out the application form.
                </li>
                <li className="step">
                  <span className="step_number">4.</span> Click "Continue." By proceeding, you agree to pay a fee
                  for jobhunt assistance.
                </li>
                <li className="step">
                  <span className="step_number">5.</span> Check your WhatsApp messages, as this is where we'll
                  communicate with you.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <footer className={`footer ${isSidebarOpen ? "above-sidebar" : ""}`}>
          <p>Our success rate is 80% in helping individuals secure jobs. Trust us to assist you in your job search!</p>
        </footer>
      </div>
    );
  }
}

export default Home;
