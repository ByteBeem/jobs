import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import JobCard from "../../components/JobCard/JobCard";
import "./Home.scss";
import Form from "./form";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      searchQuery: "",
      selectedProvince: "",
      jobs: [],
      searching: false,
      showModal: false, // Added for modal control
    };
  }

  componentDidMount() {
    this.fetchJobs();
  }

  fetchJobs = () => {
    const url = "https://api.play929.com/api/Games/jobs";

    this.setState({ searching: true });

    axios
      .get(url)
      .then((response) => {
        this.setState({ jobs: response.data.jobs, searching: false });
      })
      .catch((error) => {
        console.error("There was an error fetching the jobs!", error);
        this.setState({ searching: false });
      });
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    this.setState({ selectedProvince, searching: true }, () => {
      this.fetchJobs();
    });
  };

  // Method to open modal
  openModal = () => {
    this.setState({ showModal: true });
  };

  // Method to close modal
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isSidebarOpen, searchQuery, jobs, selectedProvince, searching, showModal } = this.state;

    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="home">
        <Sidebar active={this.props.active} closeSidebar={this.props.closeSidebar} />
        <div className="home_container">
          <Navbar showSidebar={this.props.showSidebar} />
          <div className="content">
            {searching ? (
              <div className="searching-message">Searching...</div>
            ) : (
              <div className="job-cards-container">
                {filteredJobs.map((job) => (
                  <div className="job-card" key={job.id}>
                    <h3 className="job-title">
                      {job.title} - {job.province}
                    </h3>
                    <p className="job-description">{job.description}</p>
                    {/* Add the Apply button, opening the modal */}
                    <button className="apply-button" onClick={this.openModal}>
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conditionally render the modal */}
        {showModal && <Form isOpen={showModal} onClose={this.onCloseModal} />}

        <footer className={`footer ${isSidebarOpen ? "above-sidebar" : ""}`}>
          <p>
            Find Free Fast Real Jobs Here: Jobs4life.co.za, For any Enquiries
            Contact 0798603827. : CopyRight 2024
          </p>
        </footer>
      </div>
    );
  }
}

export default Home;
