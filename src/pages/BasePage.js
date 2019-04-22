import { Component } from 'react';
import { setPageTitle } from 'utils/PageUiUtils';

class BasePage extends Component {
  componentDidMount() {
    this.setPageTitle("");
  };

  saveData() { }

  setPageTitle = title => {
    setPageTitle(title);
  }
}
export default BasePage;