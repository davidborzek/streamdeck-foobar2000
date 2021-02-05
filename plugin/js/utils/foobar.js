let host = "localhost";

const foobar = {
  baseUrl: `http://${host}:8880/api`,
  getPlayerState: async () => {
    const response = await axios.get(
      `${foobar.baseUrl}/player?columns=%25artist%25,%25title%25`
    );
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
      callback(response.status >= 200, response.data);
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
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  skipForward: async (callback) => {
    try {
      const response = await axios.post(`${foobar.baseUrl}/player/next`, {
        timeout: 500,
      });
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  skipBackward: async (callback) => {
    try {
      const response = await axios.post(`${foobar.baseUrl}/player/previous`, {
        timeout: 500,
      });
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  setVolume: async (volume, callback) => {
    if (volume < -100 || volume > 0) {
      callback(false, "Volume must be between -100 and 0.");
    }
    try {
      const response = await axios.post(
        `${foobar.baseUrl}/player`,
        { volume },
        {
          timeout: 500,
        }
      );
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  stop: async (callback) => {
    try {
      const response = await axios.post(`${foobar.baseUrl}/player/stop`, {
        timeout: 500,
      });
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
  playRandom: async (callback) => {
    try {
      const response = await axios.post(
        `${foobar.baseUrl}/player/play/random`,
        {
          timeout: 500,
        }
      );
      callback(response.status >= 200, response.data);
    } catch (e) {
      callback(false, e);
    }
  },
};
