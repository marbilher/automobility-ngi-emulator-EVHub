
// import React, { Component } from 'react'
// import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
// import './App.css'


// class mapPage extends React.Component{

// constructor(props) {
//   super(props);

//   this.state= {
//     lat: 51.505,
//     lng: -0.09,
//     zoom: 13,
//   }

// }



//   render() {
//     const position = [this.state.lat, this.state.lng]

//     return (
//       <React.Fragment>
//       <Map center={position} zoom={this.state.zoom}>
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </Map>

//       <div id="mapid" style="height:520px; width:1255px">

//       </div>


//       </React.Fragment>
//     )
//   }
// }

// export default mapPage;






import React, { Component } from "react";
import L from "leaflet";
 const gm = window.gm;
 class MapPage extends Component {
  state = {
    mymap: "",
    currentData: "",
    C: undefined,
    batteryStyle: {
      width: "",
      backgroundColor: "black",
    },
    batteryText: ''
  };
   componentDidMount() {
    gm.info.getCurrentPosition(this.processPosition, true); // defaults to detroit (42, -83)
  }
   handleClose = () => {
    gm.system.closeApp();
  };
   didPressToggleBtn = () => {
    console.log("did click");
    if (this.state.C === undefined) {
      this.setVariableRange(this.state.currentData);
    } else {
      this.state.mymap.removeLayer(this.state.C);
      this.setState({
        C: undefined
      });
    }
  };
   getFuelLevel = data => {
    this.setVariableRange(data);
  };
   watchVehicleData = data => {
    this.setState({
      currentData: data
    });
    this.setVariableRange(data);
  };
   processPosition = position => {
    this.setMapPosition(34.04, -118.21); // coordinates for Los Angeles
     gm.info.getVehicleData(this.getFuelLevel, ["fuel_level"]);
     gm.info.watchVehicleData(
      this.watchVehicleData,
      this.failedToWatchVehicleData,
      ["fuel_level"]
    );
  };
   setVariableRange = data => {
    //fuelEconomy varies according to vehicle
    let fuelEconomy = 100;
     // depending on the vehicle, the number of miles from a 100% charge will vary.
    let maximumMilesForVehicle = 200;
     let fuelPercentage = data.fuel_level / fuelEconomy;
     // miles left in the current charge
    let milesLeft = fuelPercentage * maximumMilesForVehicle;
     let colorWarning;
     if (fuelPercentage >= 0.6) {
      colorWarning = "green";
    } else if (fuelPercentage < 0.6 && fuelPercentage > 0.2) {
      colorWarning = "yellow";
    } else if (fuelPercentage <= 0.2) {
      colorWarning = "red";
    }
     // Battery div max width is 113px
    // 10% = 11.3px
    // 25% = 28.25px
    // 50% = 56.5px
    // 75% = 84.30px
    // 90% = 101.7px
     // circle radius is in meters
    // 1609 meters = 1 mile
    // assume 1% = 1 mile
    // therefore: fuelPercentage * 100 * 1609 = radius AND milesLeft * 1609 = radius
     if (this.state.C !== undefined) {
      this.state.mymap.removeLayer(this.state.C);
    }
     this.setState(
      {
        batteryStyle: {
          width: fuelPercentage * 113 + "px",
          backgroundColor: colorWarning,
          left: "50px",
          marginTop: "40px",
          position: "absolute",
          zIndex: "1000",
          fontSize: "30px"
        },
        batteryText: data.fuel_level + "%",
        C: L.circle([34.04, -118.21], {
          radius: milesLeft * 200,  //prev value 1609, replacing with 200
          color: colorWarning,
          fillColor: colorWarning,
          fillOpacity: 0.2
        })
      },
      () => {
        this.state.C.addTo(this.state.mymap);
      }
    );
  };
   setMapPosition = (incomingLat, incomingLng) => {
    this.setState({
      mymap: L.map("mapid").setView([incomingLat, incomingLng], 12)
    });
     L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox.streets"
      }
    ).addTo(this.state.mymap);
  };
   render() {
    return (
      
      <React.Fragment>
        <div
          style={{
            backgroundColor: "gray",
            height: "100px",
            display: "block"
          }}
        >
          {/* <img
            src="images/battery.png"
            alt="battery"
            style={{
              left: "10px",
              marginTop: "10px",
              width: "150px",
              position: "absolute",
              zIndex: "999999"
            }}
          /> */}
          <div
            id="battery-percentage"
            style={this.state.batteryStyle && this.state.batteryStyle}
          >
            {this.state.batteryText && this.state.batteryText}
          </div>
          <div
            id="battery-charge"
            style={{
              backgroundColor: "black",
              width: "50px",
              height: "65px",
              left: "20px",
              marginTop: "20px",
              position: "absolute",
              zIndex: "1"
            }}
          />
          <button
            id="toggle-pulse-btn"
            style={{
              backgroundColor: "azure",
              width: "300px",
              height: "77px",
              left: "170px",
              marginTop: "15px",
              position: "absolute",
              fontSize: "40px"
            }}
            onClick={this.didPressToggleBtn}
          >
            Smart Reroute
          </button>
        </div>
        <div id="mapid" style={{ height: "520px", width: "1255px" }} />
      </React.Fragment>
    );
  }
}

export default MapPage;