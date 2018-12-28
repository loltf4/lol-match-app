const express = require("express");
const bodyParser = require("body-parser");
const _kayn = require("kayn");
const Kayn = _kayn.Kayn;
const METHOD_NAMES = _kayn.METHOD_NAMES;
const LRUCache = _kayn.LRUCache;
const fs = require("fs");
const myCache = new LRUCache({ max: 5 });

const key = fs.readFileSync("./APIKEY.txt", "utf8");
const app = express();
const port = process.env.PORT || 5000;

const kayn = Kayn(key)({
  region: "na",
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    //added burst to the default loadout as it seemed to increase load speeds
    burst: true
  },
  cacheOptions: {
    cache: myCache,
    ttls: {},
    timeToLives: {
      useDefault: true,
      byGroup: {
        DDRAGON: 10000
      },
      byMethod: {
        [METHOD_NAMES.DDRAGON.RUNES_REFORGED_LIST]: 5000,
        [METHOD_NAMES.CHAMPION.GET_CHAMPION_ROTATIONS]: 5000
      }
    }
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//recieves a post request with the sommoners name, gets the info on it and returns it
app.post("/summoner", (req, res) => {
  getInfo(req.body.post).then(account => res.send(account));
});

app.listen(port);

//recieves the searched name then procedes to interact with the LoL API through kayn
const getInfo = async name => {
  let account = {};
  //gets the summoners info based on the searched name
  const summoner = await kayn.SummonerV4.by.name(name);
  //finds the summoners match history based on account id
  const matchHistory = await kayn.MatchlistV4.by.accountID(summoner.accountId);
  const matches = [];
  //limits the amount of matches to load to 10 or less
  const ttlMatches =
    parseInt(matchHistory.totalGames) > 10
      ? 10
      : parseInt(matchHistory.totalGames);
  //populates a list of matches to be passed to the client
  for (let i = 0; i < ttlMatches; i += 1) {
    matches[i] = await kayn.MatchV4.get(matchHistory.matches[i].gameId);
    console.log(i);
  }
  //gets champion specific data from data dragon
  const champs = await kayn.DDragon.Champion.listFullDataByIdWithParentAsId();
  const summSpells = DDragon.SummonerSpell.list();
  /* builds a LARGEjson unit from all the data collected from the API
   (some of these can be trimmed off due to value duplication [ex. summoner]) */
  account = Object.assign(summoner, matches, champs, summSpells, {
    ttlMatches
  });
  return account;
};
