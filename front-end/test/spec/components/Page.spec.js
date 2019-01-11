import { Center, Page } from "src/components/Page";
import { h } from "preact";
import { Header } from "src/components/Header";
import { shallow } from "preact-render-spy";
import styles from "src/components/Page.scss";

describe("Center", function() {
  it("wraps children in styles div", function() {
    const context = shallow(
      <Center>
        <span>first</span>
        <span>second</span>
      </Center>
    );
    expect(context.children().length).to.equal(2);
    expect(context.childAt(0).text()).to.equal("first");
    expect(context.childAt(1).text()).to.equal("second");
    expect(context.find(`.${styles.center}`).length).to.equal(1);
  });
});

describe("Page", function() {
  it("contains a header with app name", function() {
    const context = shallow(<Page />);
    expect(context.contains(<Header />)).to.be.true;
  });
});
