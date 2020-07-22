# SecondHandTrader

Retrieve information from the Blizzard API's.
Currently working on:
 - Mythic+ Ranks & Affixes (EU/US)
 - WoW Token (EU/US)
 - Characters & Achievements (EU/US)
 - Realms (EU/US)

# Install
After performing <code>git clone</code>, you'll have to create a config folder and file starting from root directory,
e.g. <code>SecondHandTrader/config/config.js</code> - with the following content:

```Javascript
const config = {
  "app": {
    "port": 5000
  },
  "bnet": {
    "clientId": "changeme",
    "clientSecret": "changeme"
  }
}

module.exports = config;
```
