class VolumeUpAction extends Action {
  type = "com.davidborzek.foobar2000.volumeup";

  constructor(context, settings, foobarCurrentVolume) {
    super(context, settings);
    this.foobarCurrentVolume = foobarCurrentVolume;
  }

  onKeyDown = (coordinates, state) => {
    foobar.setVolume(this.foobarCurrentVolume + 1, (success, message) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };
}
