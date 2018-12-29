Battlefy Coding Challenge

Brock Forest
December 28, 2018

To run:
    yarn run local //local run
    yarn run publish //online build

Could Improve:
    No user feedback on whats happening if they enter incorrect information
    Error testing and handling is lacking
    UI is primitive and rushed
    Load times are slow! (getting match data is unreasonably slow):
        -could use caching to enhance reloading experience
        -possibly didn't implement as asynchronous as possible
        -would've liked a loading bar at least to give feedback on the
        crippling slowness... but trying to get out the required implementations
        in 2-4hrs so avoiding feature creep
    Only loading latest 10 matches:
        -kayn has example implementations of how to acquire all match history
        which seemed overly ardous for the required task at hand
        "(latest matches from the summoner is fine)"

Issues:
    Never managed to implement Runes, Summoner Spells, or Item purchases
        -all DDragon things which I had issues with accessing and really slowed
        my progress
    "sh: 1: react-scripts: Permission denied"
        -Having issues getting the app to deploy on netlify through github

NOTE:
    Updated assets to 8.24.1 from 8.20.1 as was causing errors with missing
    files ex: C9 Sneaky using a new player icon that wasn't in the older assets