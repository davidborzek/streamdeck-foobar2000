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
    if (this.foobarPlaybackState === "stopped") {
      foobar.playRandom((success, msg) => {
        websocketUtils.setState(this.context, state);
        if (!success) {
          websocketUtils.showAlert(this.context);
          websocketUtils.log(
            "Error to play a random song, check if foobar is running!"
          );
        }
      });
    } else {
      foobar.togglePlayPause((success, msg) => {
        websocketUtils.setState(this.context, state);
        if (!success) {
          websocketUtils.showAlert(this.context);
          websocketUtils.log(
            "Error to play or pause, check if foobar is running!"
          );
        }
      });
    }
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
