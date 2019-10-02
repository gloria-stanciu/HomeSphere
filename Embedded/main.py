from src import publisher
from src.services.id import get_device_id
from src.services.files import get_by_key

if get_by_key("id", "Settings.txt") == False:
    get_device_id()
    import src.register

publisher.publish_hardware()
