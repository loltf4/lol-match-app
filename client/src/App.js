import React, { Component } from "react";
import NavBar from "./components/navbar.jsx";

class App extends Component {
  state = {
    playerName: "",
    playerIcon: "/assets/lolMatchApp.png"
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
          playerIcon={this.state.playerIcon}
        />
      </React.Fragment>
    );
  }
}

export default App;
