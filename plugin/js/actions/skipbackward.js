class SkipBackwardAction extends Action {
  type = "com.davidborzek.foobar2000.skipbackward";

  constructor(context, settings) {
    super(context, settings);
  }

  onKeyDown = (coordinates, state) => {
    foobar.skipBackward((success, message) => {
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };
}
