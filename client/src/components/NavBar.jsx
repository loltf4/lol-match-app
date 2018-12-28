import React, { Component } from "react";

class NavBar extends Component {
  state = { name: "" };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.onSearch(this.state.name);
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
          <div>
            <img
              src={window.location.origin + this.props.playerIcon}
              className="rounded mr-1"
              style={{ width: 50, height: 50 }}
              alt=""
            />
            <div className="navbar-brand">{this.props.playerName}</div>
          </div>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Summoner Name"
              aria-label="Search"
              //Summoner names max at 16
              maxLength="16"
              value={this.state.name}
              //updates currently typed name when anything is entered
              onChange={e => this.setState({ name: e.target.value })}
              //highlights/selects the text when clicked
              onClick={e => e.target.select()}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
