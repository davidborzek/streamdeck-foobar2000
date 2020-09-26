const MuteState = Object.freeze({
  unmuted: 0,
  muted: 1,
});

class ToggleMuteAction extends Action {
  type = "com.davidborzek.foobar2000.togglemute";

  setMuteStatus = (muted) => {
    this.foobarMuteState = muted;
  };

  onKeyDown = (coordinates, state) => {
    foobar.setMuteStatus(state !== MuteState.muted, (success, message) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(message);
      }
    });
  };

  onKeyUp = (coordinates, state) => {
    websocketUtils.setState(this.context, state);
  };

  onWillAppear = (coordinates) => {
    websocketUtils.setState(
      this.context,
      this.foobarMuteState ? MuteState.muted : MuteState.unmuted
    );
  };
}
