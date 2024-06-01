import React, { useState } from "react";
import Error from "../ErrorModal/ErrorModal";
import Auth from "../Login/Login";
import axios from "axios";
import "./create.scss";
import Success from "../ErrorModal/Success";

const Create = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [jobTitles, setJobTitles] = useState(["", "", ""]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage] = useState("Your Request has been recieved , one of our agents will contact you on whatsapp.")


  const handleJobTitleChange = (index, event) => {
    const updatedJobTitles = [...jobTitles];
    updatedJobTitles[index] = event.target.value;
    setJobTitles(updatedJobTitles);
  };

  const create = async () => {
    setIsLoading(true);
    try {
      const payload = {
        fullName,
        surname,
        whatsappNumber,
        jobTitles,
      };

      const response = await axios.post(
        "https://play929-1e88617fc658.herokuapp.com/wallet/jobhunt",
        payload,
        {

        }
      );

      if (response.status === 200) {
        setSuccessModal(true);
        setFullName("");
        setJobTitles("");
        setWhatsappNumber("");
        setSurname("");


      }
    } catch (error) {
      setErrorMessage(error.response.data.error || "Something went wrong , try again later.");
      setErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="create-modal-overlay">
        <div className="login">
          <div className="login_container">
            <button className="create-close-button" onClick={onClose}>
              X
            </button>

            <div>
              <span>Fill in this Form:</span>
              <div>
                <input
                  type="text"
                  value={fullName}
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={surname}
                  placeholder="Surname"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="telephone"
                  value={whatsappNumber}
                  placeholder="WhatsApp Number"
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={jobTitles[0]}
                  placeholder="1st Job Title"
                  onChange={(e) => handleJobTitleChange(0, e)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={jobTitles[1]}
                  placeholder="2nd Job Title"
                  onChange={(e) => handleJobTitleChange(1, e)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={jobTitles[2]}
                  placeholder="3rd Job Title"
                  onChange={(e) => handleJobTitleChange(2, e)}
                />
              </div>
              <button
                onClick={create}
                className={`form_btn ${isLoading ? "disabled" : ""}`}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Applying..." : "Apply"}
              </button>
            </div>
          </div>
        </div>

        {loginModalOpen && (
          <Auth isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        )}
        {errorModalOpen && (
          <Error
            errorMessage={errorMessage}
            isOpen={errorModalOpen}
            onClose={() => setErrorModalOpen(false)}
          />
        )}

        {successModal && (
          <Success
            errorMessage={successMessage}
            isOpen={successModal}
            onClose={() => setSuccessModal(false)}
          />
        )}
      </div>
    )
  );
};

export default Create;
