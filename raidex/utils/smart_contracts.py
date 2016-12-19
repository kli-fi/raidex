import os
import time

import rex


def get_contract_path(contract_name):
    project_directory = os.path.dirname(rex.__file__)
    contract_path = os.path.join(project_directory, 'smart_contracts', contract_name)
    return os.path.realpath(contract_path)


class milliseconds(object):

    @staticmethod
    def to_seconds(ms):
        """Return representation in pythons `time.time()` scale.
        """
        return ms / 1000.

    @staticmethod
    def to_int(t):
        return int(round(t * 1000))

    @staticmethod
    def time():
        now = time.time()
        return now * 1000

    @classmethod
    def time_int(cls):
        return cls.to_int(cls.time())