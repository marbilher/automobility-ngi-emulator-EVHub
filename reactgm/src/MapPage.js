
// import React from 'react'
// import styles from "./App.module.css";


// class MapPage extends React.Component {

    
//   state = {
//     vin: "pending..."
//   };

  

//   componentDidMount() {
//     const gm = window.gm;

//     const vin = gm.info.getVIN();
//     this.setState({ vin });
//   }

//   handleClose = () => {
//     const gm = window.gm;

//     gm.system.closeApp();
//   };

//   render() {
      
//     return (
//       <div className='text-white'>
//         <h1>TESTING</h1>
//       </div>
//     );
//   }
// }

// export default MapPage;



import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import './App.css'


class mapPage extends React.Component{

constructor(props) {
  super(props);

  this.state= {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

}



  render() {
    const position = [this.state.lat, this.state.lng]

    return (
      <React.Fragment>

        <h1>CHEESE</h1>
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
      </React.Fragment>
    )
  }
}

export default mapPage;