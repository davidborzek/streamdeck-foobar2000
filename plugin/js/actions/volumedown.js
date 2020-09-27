class VolumeDownAction extends Action {
  type = "com.davidborzek.foobar2000.volumedown";

  setVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  onKeyDown = (coordinates, state) => {
    const volumeStep = this.settings.volumeStep || 1;

    foobar.setVolume(
      this.foobarCurrentVolume - volumeStep,
      (success, message) => {
        websocketUtils.setState(this.context, state);
        if (!success) {
          websocketUtils.showAlert(this.context);
          websocketUtils.log(
            "Error to decrease the volume, check if foobar is running!"
          );
        }
      }
    );
  };
}
