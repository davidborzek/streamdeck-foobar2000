class NowPlayingAction extends Action {
  type = "com.davidborzek.foobar2000.nowplaying";

  setCurrentPlayback = (playback, image) => {
    this.foobarCurrentPlayback = playback;
    this.currentArtwork = image;
  };

  onWillAppear = (coordinates) => {
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
    }
    
  };
}
