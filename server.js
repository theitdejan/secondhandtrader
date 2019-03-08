const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const _ = require('lodash');

// Token requires
const WoWTokenWrapper = require('./server/Wrappers/WoW/WoWTokenWrapper');
const WoWTokenUrls = require('./server/Urls/WoW/WoWToken');

// Affix requires
const MythicKeystoneAffixWrapper = require('./server/Wrappers/WoW/MythicKeystoneAffixWrapper');
const MythicKeystoneAffixUrls = require('./server/Urls/WoW/MythicKeystoneAffix');

// Character requires
const CharacterWrapper = require('./server/Wrappers/WoW/CharacterWrapper');
const CharacterUrls = require('./server/Urls/WoW/Character');

// Realm requires
const RealmWrapper = require('./server/Wrappers/WoW/RealmWrapper');
const RealmUrls = require('./server/Urls/WoW/Realm');

// Instantiate express app and assign a port.
const app = express();
const port = config.app.port || 5000;

// Serve static react files
app.use(express.static(path.join(__dirname, 'client/build')));

// Security
app.use(helmet());

// Body Parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// CORS Security
app.use(cors());

// HTTP Request Logging inside console window.
app.use(morgan('tiny'));

/**
 * GET
 * 
 * Token price for EU realms.
 */
app.get(WoWTokenUrls.Request.Price.EU, (req, res) => {
  WoWTokenWrapper.getPriceEU()
    .then(wowtoken => {
      return res.status(200).send(wowtoken);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * Token price for US realms.
 */
app.get(WoWTokenUrls.Request.Price.US, (req, res) => {
  WoWTokenWrapper.getPriceUS()
    .then(wowtoken => {
      return res.status(200).send(wowtoken);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * All affixes for EU realms.
 */
app.get(MythicKeystoneAffixUrls.Request.All.EU, (req, res) => {
  MythicKeystoneAffixWrapper.getAllAffixesEU()
    .then(affixes => {
      return res.status(200).send(affixes);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * All affixes for US realms.
 */
app.get(MythicKeystoneAffixUrls.Request.All.US, (req, res) => {
  MythicKeystoneAffixWrapper.getAllAffixesUS()
    .then(affixes => {
      return res.status(200).send(affixes);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
* Affix information for the specified Affix ID on EU realms.
 */
app.get(MythicKeystoneAffixUrls.Request.Single.EU, (req, res) => {
  const { id } = req.params;
  if (_.isUndefined(id) || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  MythicKeystoneAffixWrapper.getSingleAffixEU(id)
    .then(affix => {
      return res.status(200).send(affix);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * Affix information for the specified Affix ID on US realms.
 */
app.get(MythicKeystoneAffixUrls.Request.Single.US, (req, res) => {
  const { id } = req.params;
  if (_.isUndefined(id) || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  MythicKeystoneAffixWrapper.getSingleAffixUS(id)
    .then(affix => {
      return res.status(200).send(affix);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * EU based character, with the passed in realm and name.
 */
app.get(CharacterUrls.Request.Single.EU, (req, res) => {
  const { realm, name } = req.body;
  if (_.isUndefined(realm) || _.isUndefined(name)) {
    return res.status(400).send({
      error: `Both Realm and Name parameters are required.`
    });
  }

  CharacterWrapper.getCharacter("EU", realm, name)
    .then(character => {
      return res.status(200).send(character);
    })
    .catch(error => {
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * US based character, with the passed in realm and name.
 */
app.get(CharacterUrls.Request.Single.US, (req, res) => {
  const { realm, name } = req.body;
  if (_.isUndefined(realm) || _.isUndefined(name)) {
    return res.status(400).send({
      error: `Both Realm and Name parameters are required.`
    });
  }

  CharacterWrapper.getCharacter("US", realm, name)
    .then(character => {
      return res.status(200).send(character);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * EU based realm, with the passed in ID.
 */
app.get(RealmUrls.Request.Single.EU, (req, res) => {
  const { id } = req.params;
  if (_.isUndefined(id) || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  RealmWrapper.getById("EU", id)
    .then(realm => {
      return res.status(200).send(realm);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * US based realm, with the passed in ID. 
 */
app.get(RealmUrls.Request.Single.US, (req, res) => {
  const { id } = req.params;
  if (_.isUndefined(id) || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  RealmWrapper.getById("US", id)
    .then(realm => {
      return res.status(200).send(realm);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * All EU realms.
 */
app.get(RealmUrls.Request.All.EU, (req, res) => {
  RealmWrapper.all("EU")
    .then(realms => {
      return res.status(200).send(realms);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * All US realms.
 */
app.get(RealmUrls.Request.All.US, (req, res) => {
  RealmWrapper.all("US")
    .then(realms => {
      return res.status(200).send(realms);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * All realms.
 */
app.get(RealmUrls.Request.All.Global, (req, res) => {
  RealmWrapper.all("Global")
    .then(realms => {
      return res.status(200).send(realms);
    })
    .catch(error => {
      console.log(error);
      return res.status(404).send({
        error
      });
    });
});

/**
 * GET
 * 
 * Serve react files.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Server is up and running...
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`)
});