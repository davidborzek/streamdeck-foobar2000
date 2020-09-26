class StopAction extends Action {
  type = "com.davidborzek.foobar2000.stop";

  onKeyDown = (coordinates, state) => {
    foobar.stop((success, message) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };
}
