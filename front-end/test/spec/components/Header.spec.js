import { h } from "preact";
import { Header } from "src/components/Header";
import { shallow } from "preact-render-spy";
import styles from "src/components/Header.scss";

describe("Header", function() {
  it("has default style", function() {
    const context = shallow(<Header />);
    expect(context.find(`.${styles.header}`).length).to.equal(1);
  });

  it("has heading", function() {
    const context = shallow(<Header />);
    expect(context.find("h1").length).to.equal(1);
    expect(context.find("h1").text()).to.equal("Hello World App");
  });
});
