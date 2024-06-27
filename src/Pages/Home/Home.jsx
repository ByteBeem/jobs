import React, { Component } from "react";
import axios from "axios";
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
      selectedProvince: "",
      jobs: [],
      searching: false,
    };
  }

  componentDidMount() {
    this.fetchJobs(); // Fetch jobs initially
  }

  fetchJobs = () => {
    const { selectedProvince } = this.state;
    let url = "https://jobs4life-a1f02ac04272.herokuapp.com/api/Identity/Jobs";
    
    // Append province filter if selected
    if (selectedProvince) {
      url += `?province=${selectedProvince}`;
    }
    
    this.setState({ searching: true }); // Set searching state to true

    axios
      .get(url)
      .then((response) => {
        this.setState({ jobs: response.data, searching: false });
        console.log(response.data);
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
      this.fetchJobs(); // Trigger job fetch when province changes
    });
  };

  render() {
    const { isSidebarOpen, searchQuery, jobs, selectedProvince, searching } = this.state;

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
            <div className="search-bar">
              <select className="select" value={selectedProvince} onChange={this.handleProvinceChange}>
                <option value="">Search by Province</option>
                <option value="Gauteng">Gauteng</option>
                <option value="Western Cape">Western Cape</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              </select>
            </div>

            {searching ? (
              <div className="searching-message">Searching...</div>
            ) : (
              <div className="job-cards-container">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
        <footer className={`footer ${isSidebarOpen ? "above-sidebar" : ""}`}>
          <p>Find Free Fast Real Jobs Here: Jobs4life.co.za, For any Enquiries Contact 0798603827. : CopyRight 2024</p>
        </footer>
      </div>
    );
  }
}

export default Home;
