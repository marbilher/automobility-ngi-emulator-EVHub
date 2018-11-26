
import React from 'react'
import styles from "./App.module.css";


class MapPage extends React.Component {

    
  state = {
    vin: "pending..."
  };

  

  componentDidMount() {
    const gm = window.gm;

    const vin = gm.info.getVIN();
    this.setState({ vin });
  }

  handleClose = () => {
    const gm = window.gm;

    gm.system.closeApp();
  };

  render() {
      
    return (
      <div className='text-white'>
        <h1>TESTING</h1>
      </div>
    );
  }
}

export default MapPage;

