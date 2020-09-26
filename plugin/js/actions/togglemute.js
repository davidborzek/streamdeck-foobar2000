const MuteState = Object.freeze({
  unmuted: 0,
  muted: 1,
});

class ToggleMuteAction extends Action {
  type = "com.davidborzek.foobar2000.togglemute";

  constructor(context, settings, foobarMuteState) {
    super(context, settings);
    this.foobarMuteState = foobarMuteState;
  }

  onKeyDown = (coordinates, state) => {};

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
