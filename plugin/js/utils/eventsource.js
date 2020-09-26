const updatePlayPauseActions = (data) => {
  console.log(data.player);
  contexts.playPauseAction.forEach((context) => {
    data.player &&
      data.player.playbackState &&
      websocketUtils.setState(
        context,
        PlaybackState[data.player.playbackState]
      );
  });
};

const eventSource = new EventSource(
  `${foobar.baseUrl}/query/updates?player=true&trcolumns=%25artist%25%20-%20%25title%25%2C%25artist%25%20-%20%25album%25%20-%20%25title%25&playlists=true&playlistItems=true&plref=p1&plcolumns=%25artist%25%2C%25title%25&plrange=0%3A100`
);

eventSource.onmessage = function ({ data }) {
  updatePlayPauseActions(JSON.parse(data));
};
