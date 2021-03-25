class PlayAction extends Action {
  type = "com.davidborzek.foobar2000.play";

  onKeyDown = (coordinates, state) => {
    foobar.triggerPlay((success, msg) => {
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
