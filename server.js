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

const CharacterWrapper = require('./server/Wrappers/WoW/CharacterWrapper');
const CharacterUrls = require('./server/Urls/WoW/Character');

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
  if (id === undefined || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  MythicKeystoneAffixWrapper.getSingleAffixEU(id)
    .then(affix => {
      return res.status(200).send(affix);
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
 * Affix information for the specified Affix ID on US realms.
 */
app.get(MythicKeystoneAffixUrls.Request.Single.US, (req, res) => {
  const { id } = req.params;
  if (id === undefined || id <= 0) {
    return res.status(400).send({
      error: "Id parameter has to be present, and greater than 0."
    });
  }

  MythicKeystoneAffixWrapper.getSingleAffixUS(id)
    .then(affix => {
      return res.status(200).send(affix);
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
 * Character, based on passed in region, realm and name.
 */
app.get("/character", (req, res) => {
  const { region, realm, name } = req.body;
  if (_.isUndefined(region) || _.isUndefined(realm) || _.isUndefined(name)) {
    return res.status(400).send({
      error: `All 3 parameters are required - Region, Realm and Name.`
    })
  }

  CharacterWrapper.getCharacter(region, realm, name)
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
 * Serve react files.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Server is up and running...
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`)
});