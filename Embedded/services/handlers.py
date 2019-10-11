from utils.configs import getOrGenId, loadConfig


def onError(message):
    print('in topic for errors')
    print(message)


def onTest(message):
    print(message)


def onDeviceRegister(message):
    print(message)


def onSensorsRegister(message):
    print(message)


topics = {
    F'device/{getOrGenId(loadConfig("./config.local.json", "./config.json"))}/error': onError,
    'testx': onTest,
    'devices/register/status': onDeviceRegister,
    'sensors/register/status': onSensorsRegister
}
