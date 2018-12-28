import React, { Component } from "react";

class Match extends Component {
  handleBadge = () => {
    let classes = this.props.outcome === "Victory" ? "info" : "danger";
    return classes;
  };

  handleBorder = () => {
    let classes = this.props.outcome === "Victory" ? "primary" : "warning";
    return classes;
  };

  handleSpell = spellID => {
    return "Flash";
  };

  //summonerSpells,
  //summonerRunes,
  //purchases,
  render() {
    const {
      outcome,
      duration,
      champPhoto,
      champName,
      kda,
      kdaRatio,
      level,
      cs,
      csRatio
    } = this.props;
    return (
      <React.Fragment>
        <span
          className={`badge badge-${this.handleBadge()} d-block border border-${this.handleBorder()} align-middle`}
        >
          <div className="d-flex flex-row">
            <img
              src={window.location.origin + champPhoto}
              alt=""
              className={`rounded-circle m-2 border border-${this.handleBorder()}`}
              style={{ height: 100, width: 100 }}
            />
            <div>
              <div className="m-2">{champName}</div>
              <div className="m-2">
                <img
                  src={
                    window.location.origin +
                    `/assets/8.24.1/img/spell/Summoner${this.handleSpell()}.png`
                  }
                  alt=""
                  className={`rounded m-1 border border-${this.handleBorder()}`}
                  style={{ height: 30, width: 30 }}
                />
                <img
                  src={
                    window.location.origin +
                    `/assets/8.24.1/img/spell/Summoner${this.handleSpell()}.png`
                  }
                  alt=""
                  className={`rounded m-1 border border-${this.handleBorder()}`}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div className={`rounded bg-${this.handleBorder()}`}>
                <img
                  src={
                    window.location.origin +
                    "/assets/img/perk-images/Styles/Domination/Electrocute/Electrocute.png"
                  }
                  alt=""
                  className="rounded m-1 bg-dark"
                  style={{ height: 30, width: 30 }}
                />
                <img
                  src={
                    window.location.origin +
                    "/assets/img/perk-images/Styles/7202_Sorcery.png"
                  }
                  alt=""
                  className="rounded m-1 bg-dark"
                  style={{ height: 30, width: 30 }}
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <div className="mt-4 mb-2 ml-2">{kda}</div>
                <div className="mt-4 mb-2 ml-1 font-weight-normal">
                  {`${kdaRatio} KDA`}
                </div>
              </div>
              <div className="d-flex flex-row">
                <div className="mt-2 mb-2 ml-2">{cs}</div>
                <div className="mt-2 mb-2 ml-1 font-weight-normal">{`${csRatio} CS`}</div>
              </div>
              <div className="d-flex flex-row">
                <div className="mt-2 mb-2 ml-2">{level}</div>
                <div className="mt-2 mb-2 ml-1 font-weight-normal">Level</div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="mt-1 mb-3 ml-2 mr-2">{outcome}</div>
              <div className="m-2">{duration}</div>
            </div>
          </div>
        </span>
      </React.Fragment>
    );
  }
}

export default Match;
