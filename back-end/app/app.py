import falcon
from app.resources.hello import HelloResource
from app.middleware.csp_component import ContentSecurityPolicyComponent

APP = falcon.API(middleware=ContentSecurityPolicyComponent())
APP.add_route("/api/hello", HelloResource())
