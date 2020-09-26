const PlaybackState = Object.freeze({
  paused: 0,
  playing: 1,
});

class PlayPauseAction extends Action {
  type = "com.davidborzek.foobar2000.playpause";

  setPlaybackState = (playbackState) => {
    this.foobarPlaybackState = playbackState;
  };

  onKeyDown = (coordinates, state) => {
    foobar.togglePlayPause((success, msg) => {
      websocketUtils.setState(this.context, state);
      if (!success) {
        websocketUtils.showAlert(this.context);
        console.log(msg);
      }
    });
  };

  onKeyUp = (coordinates, state) => {
    websocketUtils.setState(this.context, state);
  };

  onWillAppear = (coordinates) => {
    websocketUtils.setState(
      this.context,
      PlaybackState[this.foobarPlaybackState]
    );
  };
}
