import SwitchCameraButton from "./Navbar/Navbar";
import React, { useRef, useCallback , useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [facingMode , setFacingMode]=useState('environment');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  const switchCamera = () =>{
    setFacingMode(prevMode => (prevMode === "user" ? "environment" : "user"))
  };


  const videoContrains ={
    setFacingMode: {exact: facingMode}
  };

  return (
    <div style={styles.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints = {videoContrains}
        style = {styles.webcam}
      />
      
      <button style={styles.button} onClick={capture}>Scan</button>
       <SwitchCameraButton onSwitchCamere={switchCamera} facingMode={facingMode}/>
    </div>
  );
};

const styles = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems : 'center',
    justifyContent: 'center',
    height : '100vh',
    width: '100vw',
    textAlign: 'center'
  },
  webcam:{
    width: '100%',
    height: 'auto',
    maxWidth: '640px',
    marginBottom:  '20px'
  },
  button:{
    padding: '1opx 20px',
    fontSize: '16px',
    margin : '5px'

  }
};

export default WebcamCapture;
