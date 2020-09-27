class NowPlayingAction extends Action {
  type = "com.davidborzek.foobar2000.nowplaying";

  setCurrentPlayback = (playback) => {
    this.foobarCurrentPlayback = playback;
  };

  onWillAppear = (coordinates) => {
    if (
      this.foobarCurrentPlayback.columns &&
      this.foobarCurrentPlayback.columns.length > 0
    ) {
    } else {
      foobar.getCurrentPlaybackInfo(
        this.foobarCurrentPlayback.playlistId,
        this.foobarCurrentPlayback.index,
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
