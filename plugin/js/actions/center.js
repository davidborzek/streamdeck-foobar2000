class Center extends Action {
  type = "com.davidborzek.foobar2000.center";

  setVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  setPlaybackState = (playbackState) => {
    this.foobarPlaybackState = playbackState;
  };

  setCurrentPlayback = (playback, image) => {
    this.foobarCurrentPlayback = playback;
    this.currentArtwork = image;
  };

  onDialRotate = (state, payload) => {

    const volumeStep = this.settings.volumeStep || 1;

    foobar.setVolume(
      this.foobarCurrentVolume + volumeStep * payload.ticks,
      (success, message) => {
        websocketUtils.setState(this.context, state);
        if (!success) {
          websocketUtils.showAlert(this.context);
          websocketUtils.log(
            "Error to change the volume, check if foobar is running!"
          );
        }
      }
    );
  };

  onDialPress = (coordinates, state, payload) => {
    if (payload.pressed) { //Only execute on press but not on release
      this.playPause(coordinates, state, payload)
    }
  };

  onTouchTap = (coordinates, state) => {
    this.playPause(coordinates, state);
  };

  playPause = (coordinates, state) => {
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

  onWillAppear = (coordinates) => {
    console.log(this.foobarCurrentPlayback)

    if (this.foobarCurrentPlayback.playbackState === "stopped") {
      websocketUtils.setTitle(this.context, "Stopped");
    } else {
      intervals[this.context] && clearInterval(intervals[this.context]);
      websocketUtils.setAsyncTitleMultiline(
        this.foobarCurrentPlayback.activeItem.columns[1],
        this.foobarCurrentPlayback.activeItem.columns[0],
        300,
        this.context
      );

      websocketUtils.setImage(
        this.context,
        this.currentArtwork
      )

      websocketUtils.setFeedback(
        this.context,
        this.currentArtwork,
        this.foobarCurrentPlayback.activeItem.columns[0],
        this.foobarCurrentPlayback.activeItem.columns[1],
      )
    }

  };


}
