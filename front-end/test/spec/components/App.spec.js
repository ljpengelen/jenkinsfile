import { App } from "src/components/App";
import fetchMock from "fetch-mock";
import { h } from "preact";
import { shallow } from "preact-render-spy";

describe("App", function() {
  beforeEach(function() {
    fetchMock.get("*", { greeting: "Some greeting" });
  });

  afterEach(function() {
    fetchMock.restore();
  });

  it("displays greeting from back end", function(done) {
    const context = shallow(<App />);

    setTimeout(() => {
      expect(context.text()).to.contain('The back end says: "Some greeting"');
      done();
    });

    expect(fetchMock.lastUrl()).to.equal(
      "http://non-existing-test-server/api/hello"
    );
  });
});
