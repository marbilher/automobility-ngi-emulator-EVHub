import React, { Component } from "react";
import styles from "./App.module.css";

const gm = window.gm;

class App extends Component {
  state = {
    vin: "pending..."
  };

  componentDidMount() {
    const vin = gm.info.getVIN();
    this.setState({ vin });
  }

  handleClose = () => {
    gm.system.closeApp();
  };

  render() {
    return (
      <div className={styles.root}>
        <div>VINss: {this.state.vin}</div>
        <button onClick={this.handleClose}>Close</button>
      </div>
    );
  }
}

export default App;
