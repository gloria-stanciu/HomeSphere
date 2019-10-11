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


id = getOrGenId(loadConfig('./config.local.json', './config.json'))

topics = {
    F'device/{id}/error': onError,
    'testx': onTest,
    'devices/register/status': onDeviceRegister,
    'sensors/register/status': onSensorsRegister
}
