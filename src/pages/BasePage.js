import { Component } from 'react';
import { setPageTitle } from '../components/util/PageUiUtils';

class BasePage extends Component {
  state = {
    test: "TEST TEST TEST1111"
  }
  componentDidMount() {
    this.setPageTitle("");

    // window.addEventListener("close", function( event ) {
    //   // make the close button ineffective
    //   event.preventDefault();
    //   console.log("window closed!!!!")
    //   this.saveData();
    // }, false);
  };

  getTest() {
    return this.state.test;
  }
  saveData() { }

  setPageTitle = title => {
    setPageTitle(title);
  }
}
export default BasePage;