def get_by_key(__key, __file):
    try:
        file = open(__file, "r")
        lines = file.readlines()
        file.close()
    except FileNotFoundError:
        print("Settings file has not been found...")
        return False

    for line in lines:
        key = line.split("=")[0]
        if key == __key:
            return line.split("=")[1].strip()

    return False


def write_to_file(__key, __value, __file):
    try:
        file = open(__file, "a+")
        file.writelines(f"\n{__key}={__value}")
        file.close()
        return __value
    except:
        print("An error happened while creating the settings file.")
    return False
