class NowPlayingAction extends Action {
  type = "com.davidborzek.foobar2000.nowplaying";

  setCurrentPlayback = (playback) => {
    this.foobarCurrentPlayback = playback;
  };

  onWillAppear = (coordinates) => {
    if (this.foobarCurrentPlayback.playbackState === "stopped") {
      websocketUtils.setTitle(this.context, "Stopped");
    } else {
      websocketUtils.setAsyncTitle(
        `${this.foobarCurrentPlayback.activeItem.columns[0]} - ${this.foobarCurrentPlayback.activeItem.columns[1]}`,
        300,
        this.context
      );
    }
  };
}
