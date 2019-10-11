import os
import json
import uuid


def loadConfig(localFile, prodFile):
    if os.path.exists(localFile):
        with open(localFile) as localConfig:
            cfg = json.load(localConfig)
            return cfg
    else:
        with open(prodFile) as cfg:
            cfg = json.load(cfg)
            return cfg


def updateConfig(localFile, prodFile, newConfig):
    if os.path.exists(localFile):
        with open(localFile, 'w') as localConfig:
            return json.dump(newConfig, localConfig, indent=4)
    elif os.path.exists(prodFile):
        with open(prodFile, 'w') as config:
            json.dump(newConfig, config, indent=4)
            return newConfig
    else:
        return False


def getOrGenId(config):
    if config['device']['_id'] != None:
        return config['device']['_id']
    else:
        id = uuid.uuid4()
        config['device']['_id'] = str(id)
        updateConfig('./config.local.json', './config.json', config)
        print(config['device']['_id'])
        return config['device']['_id']
