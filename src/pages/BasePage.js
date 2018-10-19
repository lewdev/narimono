import { Component } from 'react';
import { setPageTitle } from '../components/util/PageUiUtils';

class BasePage extends Component {
  componentDidMount() {
    this.setPageTitle("");

    // window.addEventListener("close", function( event ) {
    //   // make the close button ineffective
    //   event.preventDefault();
    //   console.log("window closed!!!!")
    //   this.saveData();
    // }, false);
    
  };

  saveData() { }

  setPageTitle = title => {
    setPageTitle(title);
  }
}
export default BasePage;