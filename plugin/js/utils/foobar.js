const foobar = {
  baseUrl: "http://localhost:8880/api",
  getPlayerState: async () => {
    const response = await axios.get(`${foobar.baseUrl}/player`);
    return response.data.player;
  },
  togglePlayPause: async (callback) => {
    try {
      const response = await axios.post(`${baseUrl}/player/pause/toggle`, {
        timeout: 500,
      });
      callback(response.status > 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
};
