import React from 'react';
import './App.css';
import firebase from "./Firebase";
import a from "./img.png";
import b from "./locationme.png";
import GoogleMapReact from 'google-map-react';
class App extends React.Component{
  state = {
    center: {
      lat: 27.714750,
      lng: 85.309285
    },
    buses:[],
    mybusid:"",
    zoom: 15,
    status: true,
    bus:{}
  };

  componentDidMount(){
    console.log(navigator.geolocation.watchPosition(this.showPosition))
    const busRef = firebase.database().ref('online_drivers');
    busRef.on('value', (snapshot)=>{
      console.log("From bus")
      let buses = snapshot.val();
      let newState = [];
      for(let bus in buses){
        // console.log(buses[bus])
        newState.push({center:{lat:buses[bus].lat, lng:buses[bus].lng, text:""+bus}})
      }
      // console.log("NEW STATE")
      // console.log(newState);
      this.setState({
        buses:newState
      })
    })
    this.requestBus()
  }

  requestBus = () => {
    fetch('http://localhost:4000/request_bus?pid=' + 1)
        .then(response => response.json())
        .then(response => this.setState({mybusid: response.data[0].bid}))
        // .then(response => console.log(response.data[0].bid))
        .catch(err => console.error(err.toString()))
  }


  showPosition = (position) => {
    console.log(position)
    this.setState({
      center:{
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      status : true

    })

    // console.log(this.state.center)
  }

  render(){
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {this.state.status?
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyBLFv4JVBlC3pXdvO7TBUBVWgrEq4bb_y0" }}
      defaultCenter={this.state.center}
      defaultZoom={this.state.zoom}
    >
      <AnyReactComponentMe
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          text="me"
      />
      {console.log(this.state.buses)}
      {this.state.buses.map((center)=>(
          <AnyReactComponent
            lat={center.center.lat}
            lng={center.center.lng}
            text={center.center.text}
            mybus={this.state.mybusid}
        />
      ))}

    </GoogleMapReact>
    : ""}
  </div>
  );
  }
}


const AnyReactComponent = ({ text, mybus }) => <div>{text===mybus? <img src={a} height={"30px"} width={"30px"}/>: <img src={a} height={"20px"} width={"20px"}/>}</div>;
const AnyReactComponentMe = ({ text }) => <img src={b} height={"30px"} width={"30px"}/>;

export default App;
