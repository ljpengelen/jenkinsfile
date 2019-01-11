import json


class HelloResource:
    def on_get(self, _, resp):  # pylint: disable=no-self-use
        resp.body = json.dumps({"greeting": "Hello World!"})
