class PauseAction extends Action {
  type = "com.davidborzek.foobar2000.pause";

  onKeyDown = (coordinates, state) => {
    foobar.triggerPause((success, msg) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        websocketUtils.log(
          "Error to play or pause, check if foobar is running!"
        );
      }
    });
  };
}
