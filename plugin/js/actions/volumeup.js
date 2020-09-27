class VolumeUpAction extends Action {
  type = "com.davidborzek.foobar2000.volumeup";

  setVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  onKeyDown = (coordinates, state) => {
    foobar.setVolume(this.foobarCurrentVolume + 1, (success, message) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        websocketUtils.log(
          "Error to increase the volume, check if foobar is running!"
        );
      }
    });
  };
}
