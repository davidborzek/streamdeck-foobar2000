const updatePlayPauseActions = (player) => {
  contexts.playPauseAction.forEach((context) => {
    player.playbackState &&
      websocketUtils.setState(context, PlaybackState[player.playbackState]);
  });
};

const updateToggleMuteActions = (player) => {
  contexts.toggleMuteAction.forEach((context) => {
    player.volume &&
      websocketUtils.setState(
        context,
        player.volume.isMuted ? MuteState.muted : MuteState.unmuted
      );
  });
};

const updateCurrentVolumeActions = (player) => {
  contexts.currentVolumeAction.forEach((context) => {
    player.volume &&
      websocketUtils.setTitle(
        context,
        `${Math.ceil(100 + player.volume.value)}`
      );
  });
};

let currentPlaying = "";

const updateCurrentPlaying = (player) => {
  contexts.nowPlayingAction.forEach((context) => {
    if (player.playbackState === "stopped") {
      intervals[context] && clearInterval(intervals[context]);
      websocketUtils.setTitle(context, "Stopped");
      return;
    }
    if (player.activeItem.columns[0] !== currentPlaying) {
      intervals[context] && clearInterval(intervals[context]);
      player.activeItem.columns.length > 0 &&
        websocketUtils.setAsyncTitle(
          player.activeItem.columns[0].replace("-", " - "),
          300,
          context
        );
      currentPlaying = player.activeItem.columns[0];
    }
  });
};

const parameters = {
  player: "true",
  trcolumns: "%artist%-%title%,%artist%-%album%-%title%",
  playlists: "true",
  playlistItems: "true",
  plref: "p1",
  plcolumns: "%artist%,%title%",
  plrange: "0:100",
};

const eventSource = new EventSource(
  `${foobar.baseUrl}/query/updates?${new URLSearchParams(
    parameters
  ).toString()}`
);

eventSource.onmessage = function ({ data }) {
  const { player } = JSON.parse(data);
  if (player) {
    foobarPlayerState = player;
    updatePlayPauseActions(player);
    updateToggleMuteActions(player);
    updateCurrentVolumeActions(player);
    updateCurrentPlaying(player);
  }
};

eventSource.onerror = (error) => {
  websocketUtils.log(
    "Error to connect with foobar2000, check if foobar is running!"
  );
};
