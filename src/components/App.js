import React, { Component } from 'react';
import '../css/App.css';
// import Button from 'material-ui/Button';
// import './css/progress.css';
// import Header from './Header';
// import Banner from './Banner';
import Stage from "./Stage";

class App extends Component {
  render() {
    return (
      <div className="App">
		{/* <Header />
		<Banner /> */}
        {/* <Button variant="raised" color="primary" className="progress">
        	Hello World
		</Button> */}
		<Stage />
      </div>
    );
  }
}

export default App;
