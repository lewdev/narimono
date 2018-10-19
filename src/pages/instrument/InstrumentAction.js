//import { find, indexOf, remove } from 'lodash';
import { observable, computed } from 'mobx';

export default class InstrumentAction {
  @observable instrumentName = null;
  constructor() {

  }

  setInstrumentByName(instrumentName) {
    console.log("setInstrumentByName instrumentName=" + instrumentName);
    this.instrumentName = instrumentName;
  }
}
