import pytest
from falcon import testing
from app.app import APP


API_URL = "/api/hello"

# pylint: disable=W0621


@pytest.fixture
def client():
    return testing.TestClient(APP)


def test_returns_greeting(client):
    response = client.simulate_get(API_URL)

    assert response.json["greeting"] == "Hello World!"
