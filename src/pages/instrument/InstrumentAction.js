//import { find, indexOf, remove } from 'lodash';
import { instrumentList, shortcutRef, soundNameList } from 'data/InstrumentData';
import { observable } from 'mobx';

export default class InstrumentAction {
  @observable instrumentName = null;
  INTERVAL_MS = 500;
  audioSet = {};

  constructor() {
    //setup audo references
    soundNameList.map(soundName =>
      this.audioSet[soundName] = { name: soundName, audio: new Audio("sounds/" + soundName + ".mp3") }
    );
    //add keyboard shortcuts
    document.addEventListener("keypress", function(e) {
      const soundName = shortcutRef[e.key];
      if (soundName) {
        this.playSoundByName(soundName);
      }
    });
  }

  setInstrumentByName(instrumentName) {
    console.log("setInstrumentByName instrumentName=" + instrumentName);
    this.instrumentName = instrumentName;
  }

  playSoundByName(name) {
    //stop other fue sounds if fue is going to be played next.
    const arr = name.split("-");
    const nameStart = arr[0];
    if (nameStart === "Fue") {
      for (var i = 0; i < soundNameList.length; i++) {
        const soundName = soundNameList[i];
        if (soundName.startsWith("Fue")) {
          const audio = this.audioSet[soundName].audio;
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }
      }
    }

    const audio = this.audioSet[name].audio;
    // stop the sound of it previously playing the same sound.
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}
