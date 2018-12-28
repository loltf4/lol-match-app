import React, { Component } from "react";
import Match from "./match";

class MatchHistory extends Component {
  render() {
    const { matches } = this.props;
    return (
      <React.Fragment>
        {matches.map(match => (
          <Match
            key={match.id}
            outcome={match.outcome}
            duration={match.duration}
            summonerSpell1={match.summonerSpell1}
            summonerSpell2={match.summonerSpell2}
            summonerRunes={match.summonerRunes}
            champPhoto={match.champPhoto}
            champName={match.champName}
            kda={match.kda}
            kdaRatio={match.kdaRatio}
            purchases={match.puchases}
            level={match.level}
            cs={match.cs}
            csRatio={match.csRatio}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default MatchHistory;
