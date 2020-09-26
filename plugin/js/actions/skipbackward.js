class SkipBackwardAction extends Action {
  type = "com.davidborzek.foobar2000.skipbackward";

  onKeyDown = (coordinates, state) => {
    foobar.skipBackward((success, message) => {
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };
}
