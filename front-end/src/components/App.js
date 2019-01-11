import { Center, Page } from "src/components/Page";
import { Component, h } from "preact";
import Settings from "src/config/settings";

export class App extends Component {
  componentDidMount() {
    fetch(Settings.apiBaseUrl + "/hello")
      .then(response => response.json())
      .then(response =>
        this.setState({
          message: response.greeting
        })
      );
  }

  render() {
    const message = this.state.message;

    return (
      <Page>
        <Center>{message && `The back end says: "${message}"`}</Center>
      </Page>
    );
  }
}
