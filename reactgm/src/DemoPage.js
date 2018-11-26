
import React from 'react'
import styles from "./App.module.css";


class DemoPage extends React.Component {

    
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
      <div className={styles.root}>
        {/* <div>Tiptop: {this.state.vin}</div> */}
        <button onClick={this.handleClose}>Close</button>
      </div>
    );
  }
}

export default DemoPage;
