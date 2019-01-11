from unittest.mock import Mock
import pytest
from falcon import testing
from app.app import APP
from app.middleware.csp_component import ContentSecurityPolicyComponent


# pylint: disable=W0621


@pytest.fixture
def csp_component():
    return ContentSecurityPolicyComponent()


@pytest.fixture
def resp():
    return Mock()


def test_adds_access_control_allow_origin_header(csp_component, resp):
    csp_component.process_response(None, resp, None, None)

    resp.set_header.assert_any_call("Access-Control-Allow-Origin", "*")


def test_adds_access_control_allow_headers_header(csp_component, resp):
    csp_component.process_response(None, resp, None, None)

    resp.set_header.assert_any_call("Access-Control-Allow-Headers", "Content-Type")


@pytest.fixture
def client():
    return testing.TestClient(APP)


def test_processes_responses(client):
    response = client.simulate_get("/non-existing-url")

    assert response.headers["Access-Control-Allow-Origin"] == "*"
    assert response.headers["Access-Control-Allow-Headers"] == "Content-Type"
