import React, { Component } from "react";
import NavBar from "./components/NavBar.jsx";

class App extends Component {
  state = {
    playerName: ""
  };

  handleSearch = async playerName => {
    this.setState({ playerName });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          onSearch={this.handleSearch}
          playerName={this.state.playerName}
        />
      </React.Fragment>
    );
  }
}

export default App;
