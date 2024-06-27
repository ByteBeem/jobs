import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import JobCard from "../../components/JobCard/JobCard";
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      searchQuery: "",
      jobs: [
        { id: 1, title: "Software Engineer", description: "Develop and maintain software applications." },
        { id: 2, title: "Data Scientist", description: "Analyze data to gain insights." },
        { id: 3, title: "Software Engineer", description: "Develop and maintain software applications." },
        { id: 4, title: "Data Scientist", description: "Analyze data to gain insights." },
        { id: 5, title: "Software Engineer", description: "Develop and maintain software applications." },
        { id: 6, title: "Data Scientist", description: "Analyze data to gain insights." },
        { id: 7, title: "Software Engineer", description: "Develop and maintain software applications." },
        { id: 8, title: "Data Scientist", description: "Analyze data to gain insights." },
      ],
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { showSidebar, active, closeSidebar } = this.props;
    const { isSidebarOpen, searchQuery, jobs } = this.state;

    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="home">
        <Sidebar active={active} closeSidebar={closeSidebar} />
        <div className="home_container">
          <Navbar showSidebar={showSidebar} />
          <div className="content">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={this.handleSearchChange}
              />
            </div>
            <div className="jobs_application">
              <div className="job-cards-container">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className={`footer ${isSidebarOpen ? "above-sidebar" : ""}`}>
          <p>Find Free Fast Real Jobs Here: Jobs4life.co.za , For any Enquiries Contact 0798603827. : CopyRight 2024</p>
        </footer>
      </div>
    );
  }
}

export default Home;
