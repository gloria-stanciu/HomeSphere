from datetime import datetime
from .files import get_by_key, write_to_file


def get_device_id():
    if get_by_key("ID", "Settings.txt") == False:
        print("ID not found, generating...")
        return gen_device_id()
    else:
        return get_by_key("ID", "Settings.txt")


def gen_device_id():
    now = datetime.now()
    now_string = now.strftime("%d%m%Y%H%M%S:%f")
    new_id = f"rpi:{now_string}"
    write_to_file("ID", new_id, "Settings.txt")
    return new_id
