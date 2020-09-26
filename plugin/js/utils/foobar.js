const foobar = {
  baseUrl: "http://localhost:8880/api",
  getPlayerState: async () => {
    const response = await axios.get(`${foobar.baseUrl}/player`);
    return response.data.player;
  },
  togglePlayPause: async () => {
    const response = await axios.post(`${foobar.baseUrl}/player/pause/toggle`);
    console.log(response);
  },
};
