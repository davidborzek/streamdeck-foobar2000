class CurrentVolumeAction extends Action {
  type = "com.davidborzek.foobar2000.currentvolume";

  setCurrentVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  onWillAppear = (coordinates) => {
    if (this.foobarCurrentVolume > -100) {
      websocketUtils.setTitle(
        this.context,
        `${Math.ceil(100 + this.foobarCurrentVolume)}`
      );
    } else {
      websocketUtils.showAlert(this.context);
    }
  };
}
