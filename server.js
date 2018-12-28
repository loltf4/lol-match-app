const express = require("express");
const bodyParser = require("body-parser");
const _kayn = require("kayn");
const Kayn = _kayn.Kayn;
const REGIONS = _kayn.REGIONS;
const METHOD_NAMES = _kayn.METHOD_NAMES;
const BasicJSCache = _kayn.BasicJSCache;
const LRUCache = _kayn.LRUCache;
const RedisCache = _kayn.RedisCache;
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
    delayBeforeRetry: 1000
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

app.listen(port);
