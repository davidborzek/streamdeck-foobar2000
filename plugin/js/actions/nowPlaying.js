class NowPlayingAction extends Action {
  type = "com.davidborzek.foobar2000.nowplaying";

  setCurrentPlayback = (playback) => {
    this.foobarCurrentPlayback = playback;
  };

  onWillAppear = (coordinates) => {
    if (this.foobarCurrentPlayback.playbackState === "stopped") {
      websocketUtils.setTitle(this.context, "\nStopped");
    } else {
      foobar.getCurrentPlaybackInfo(
        this.foobarCurrentPlayback.activeItem.playlistId,
        this.foobarCurrentPlayback.activeItem.index,
        (success, message) => {
          if (!success) {
            websocketUtils.showAlert(this.context);
            websocketUtils.log(
              "Error could not get current playback, check if foobar is running!"
            );
          } else {
            const title = utils.addLineBreak(`${message[0]} - ${message[1]}`);
            websocketUtils.setTitle(this.context, title);
          }
        }
      );
    }
  };
}
