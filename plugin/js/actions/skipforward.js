class SkipForwardAction extends Action {
  type = "com.davidborzek.foobar2000.skipforward";

  constructor(context, settings) {
    super(context, settings);
  }

  onKeyDown = (coordinates, state) => {
    foobar.skipForward((success, message) => {
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };
}
