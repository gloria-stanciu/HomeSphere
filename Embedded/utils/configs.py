import os
import json
import uuid


def loadConfig(localFile, prodFile):
    if os.path.isfile(localFile):
        with open(localFile) as localConfig:
            return json.load(localConfig)
    elif os.path.isfile(prodFile):
        with open(prodFile) as config:
            return json.load(config)
    else:
        return False


def updateConfig(localFile, prodFile, newConfig):
    if os.path.isfile(localFile):
        with open(localFile, 'w') as localConfig:
            return json.dump(newConfig, localConfig, indent=4)
    elif os.path.isfile(prodFile):
        with open(prodFile, 'w') as config:
            return json.dump(config, newConfig, indent=4)
    else:
        return False


def getOrGenId(config):
    if config['device']['_id'] != None:
        return config['device']['_id']
    else:
        id = uuid.uuid4()
        config['device']['_id'] = str(id)
        updateConfig('./config.local.json', './config.json', config)
        return config['device']['_id']
