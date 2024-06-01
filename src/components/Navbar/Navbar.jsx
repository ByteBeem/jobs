import React, { useState } from "react";
import Create from "../../Pages/Games/create";
import Error from "../../Pages/ErrorModal/ErrorModal";
import "./Navbar.scss";

const Navbar = ({ showSidebar }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const openModal = () => {
    setCreateModalOpen(true);
  };


  return (
    <>
      <header>

        <ul className="games_filter">
          <li>
            <div className="balance">
              <h6>Jobs4life</h6>
             
            </div>
          </li>
        </ul>

          <div className="tournament">
            <div className="torn_name" >Jobhunt </div>
            <button className="torn_btn" onClick={openModal}>+</button>
          </div>
        
      </header>
      {createModalOpen && <Create isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />}
      
     
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}
    </>
  );
};

export default Navbar;
