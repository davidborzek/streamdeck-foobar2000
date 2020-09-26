const foobar = {
  baseUrl: "http://localhost:8880/api",
  getPlayerState: async () => {
    const response = await axios.get(`${foobar.baseUrl}/player`);
    return response.data.player;
  },
  togglePlayPause: async (callback) => {
    try {
      const response = await axios.post(
        `${foobar.baseUrl}/player/pause/toggle`,
        {
          timeout: 500,
        }
      );
      callback(response.status > 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  setMuteStatus: async (muted, callback) => {
    try {
      const response = await axios.post(
        `${foobar.baseUrl}/player`,
        { isMuted: muted },
        {
          timeout: 500,
        }
      );
      callback(response.status > 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  skipForward: async (callback) => {
    try {
      const response = await axios.post(`${foobar.baseUrl}/player/next`, {
        timeout: 500,
      });
      callback(response.status > 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  skipBackward: async (callback) => {
    try {
      const response = await axios.post(`${foobar.baseUrl}/player/previous`, {
        timeout: 500,
      });
      callback(response.status > 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
};
