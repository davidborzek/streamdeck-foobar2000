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

const eventSource = new EventSource(
  `${foobar.baseUrl}/query/updates?player=true&trcolumns=%25artist%25%20-%20%25title%25%2C%25artist%25%20-%20%25album%25%20-%20%25title%25&playlists=true&playlistItems=true&plref=p1&plcolumns=%25artist%25%2C%25title%25&plrange=0%3A100`
);

eventSource.onmessage = function ({ data }) {
  const { player } = JSON.parse(data);
  if (player) {
    foobarPlayerState = player;
    updatePlayPauseActions(player);
    updateToggleMuteActions(player);
    updateCurrentVolumeActions(player);
  }
};

eventSource.onerror = (error) => {
  websocketUtils.log(
    "Error to connect with foobar2000, check if foobar is running!"
  );
};
