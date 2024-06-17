import React, { useState } from "react";
import Create from "../../Pages/Games/create";
import Error from "../../Pages/ErrorModal/ErrorModal";
import "./Navbar.scss";

const Navbar = ({ showSidebar , onSwitchCamere , facingMode}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () =>{
    onSwitchCamere();
  }
  

  const openModal = () => {
    setCreateModalOpen(true);
  };


  return (
    <>
      <header>

        <ul className="games_filter">
          <li>
            <div className="balance">
              <h6>Face4ife.co.za</h6>
             
            </div>
          </li>
        </ul>

        <button  onClick={handleClick}>
          {facingMode === "user"? "Switch to back Camera" : "Switch to front Camera"}
        </button>

          
        
      </header>
      {createModalOpen && <Create isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />}
      
     
      {errorModalOpen && <Error errorMessage={errorMessage} isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />}
    </>
  );

  
};

export default Navbar;
