import React, { Component } from "react";
import NavBar from "./components/navbar";
import MatchHistory from "./components/matchhistory";

class App extends Component {
  state = {
    playerIcon: "/assets/lolMatchApp.png",
    playerName: "",
    matches: []
  };

  handleSearch = async playerName => {
    let playerIcon = "/assets/lolMatchApp.png";
    let matches = [];
    //IF the searched name is between the 3-16 limit (max limit enforced my input)
    if (playerName.length > 2) {
      //Post to server the entered playername
      const response = await fetch("/summoner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ post: playerName })
      });
      //save the servers json response from kayn
      const account = JSON.parse(await response.text());
      this.setState({ playerName: account.name });
      playerIcon = `/assets/8.24.1/img/profileicon/${
        account.profileIconId
      }.png`;

      let mins,
        secs,
        selectedChamp,
        champIco,
        matchResult,
        kdaScore,
        kdaRatio,
        lvl,
        cs,
        csRatio,
        summSpell1,
        summSpell2;
      //const summSpells = [];
      //Loop through all the matches latest matches we found
      for (let i = 0; i < account.ttlMatches; i += 1) {
        //converts time from seconds to mins and seconds to display as ingame
        mins = Math.floor(account[i].gameDuration / 60);
        secs = Math.round(account[i].gameDuration % 60);
        //Loop through all the players in the ith match (allows for special maps like twisted treeline)
        for (let j in account[i].participantIdentities) {
          //IF we have found the searched for player
          if (
            account[i].participantIdentities[j].player.summonerName ===
            account.name
          ) {
            //Summoner spells WANTED to put these into 1 variable with an array but... time restrictions
            summSpell1 = account[i].participants[j].spell1Id;
            summSpell2 = account[i].participants[j].spell2Id;
            //Champions name
            selectedChamp =
              account.data[account[i].participants[j].championId].name;
            //Champions icon (some names have spaces which are removed for image names)
            champIco = account.data[account[i].participants[j].championId].key;
            //KDA for the selected player
            kdaScore = `${account[i].participants[j].stats.kills}/${
              account[i].participants[j].stats.deaths
            }/${account[i].participants[j].stats.assists}`;
            //Calculates KDA ratio
            kdaRatio = (
              (account[i].participants[j].stats.kills +
                account[i].participants[j].stats.assists) /
              account[i].participants[j].stats.deaths
            ).toFixed(2);
            //Champions level for selected player
            lvl = account[i].participants[j].stats.champLevel;
            //Last hits for the selected player and a ratio of lh vs time
            cs =
              account[i].participants[j].stats.totalMinionsKilled +
              account[i].participants[j].stats.neutralMinionsKilledEnemyJungle +
              account[i].participants[j].stats.neutralMinionsKilledTeamJungle;
            //
            csRatio = (cs / (mins + secs / 60)).toFixed(2);
            //IF the player won the game or not
            matchResult = account[i].participants[j].stats.win
              ? "Victory"
              : "Defeat";
            break;
          }
        }
        //creates an instance of a given match, sets the newely found information and concats it
        const match = {
          id: i,
          outcome: matchResult,
          duration: `${mins}m ${secs}s`,
          summonerSpell1: summSpell1,
          summonerSpell2: summSpell2,
          champPhoto: `/assets/8.24.1/img/champion/${champIco}.png`,
          champName: selectedChamp,
          kda: kdaScore,
          kdaRatio: kdaRatio,
          level: lvl,
          cs: cs,
          csRatio: csRatio
        };
        //builds up the list of matches so that matchhistory can map it
        matches = [...matches, match];
      }
    } else {
      //invalid name entered (0-2 characters) [may make search stricter]
      this.setState({ playerName: "" });
    }
    this.setState({ playerIcon });
    this.setState({ matches });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          onSearch={this.handleSearch}
          playerName={this.state.playerName}
          playerIcon={this.state.playerIcon}
        />
        <MatchHistory matches={this.state.matches} />
      </React.Fragment>
    );
  }
}

export default App;
