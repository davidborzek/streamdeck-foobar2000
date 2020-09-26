const PlaybackState = Object.freeze({
  paused: 0,
  playing: 1,
});

class PlayPauseAction extends Action {
  type = "com.davidborzek.foobar2000.playpause";

  constructor(context, settings, foobarPlaybackState) {
    super(context, settings);
    this.foobarPlaybackState = foobarPlaybackState;
  }

  onKeyDown = (coordinates, userDesiredState) => {
    foobar.togglePlayPause();
  };

  onKeyUp = (coordinates, userDesiredState) => {};

  onWillAppear = (coordinates) => {
    console.log(this.foobarPlaybackState);
    websocketUtils.setState(
      this.context,
      PlaybackState[this.foobarPlaybackState]
    );
  };
}
