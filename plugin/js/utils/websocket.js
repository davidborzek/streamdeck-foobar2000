let intervals = {};

const websocketUtils = {
  registerPlugin: (uuid, event) => {
    if (websocket) {
      const data = {
        event,
        uuid,
      };

      websocket.send(JSON.stringify(data));
    }
  },
  requestGlobalSettings: (context) => {
    if (websocket) {
      const data = {
        event: "getGlobalSettings",
        context,
      };

      websocket.send(JSON.stringify(data));
    }
  },
  saveSettings: (action, context, payload) => {
    if (websocket) {
      const data = {
        action,
        event: "setSettings",
        context,
        payload,
      };
      websocket.send(JSON.stringify(data));
    }
  },
  setTitle: (context, title) => {
    if (websocket) {
      const data = {
        event: "setTitle",
        context,
        payload: {
          title,
          target: 0,
        },
      };

      websocket.send(JSON.stringify(data));
    }
  },

  setAsyncTitle: (text, interval, context) => {
    text = ` ${text} `;
    let currentFirstChar = 0;

    intervals[context] = setInterval(() => {
      if (currentFirstChar + 8 > text.length) {
        currentFirstChar = 0;
      }
      websocketUtils.setTitle(
        context,
        text.substring(currentFirstChar, currentFirstChar + 8)
      );
      currentFirstChar++;
    }, interval);
  },

  setAsyncTitleMultiline: (text1, text2, interval, context) => {
    text1 = ` ${text1} `;
    text2 = ` ${text2} `;
    let currentFirstChar1 = 0;
    let currentFirstChar2 = 0;

    intervals[context] = setInterval(() => {
      if(currentFirstChar1 + 8 > text1.length) currentFirstChar1 = 0;
      if(currentFirstChar2 + 8 > text2.length) currentFirstChar2 = 0;
      websocketUtils.setTitle(
        context,
        `${text1.substring(currentFirstChar1, currentFirstChar1 + 8)}\n${text2.substring(currentFirstChar2, currentFirstChar2 + 8)}`
      );
      currentFirstChar1++;
      currentFirstChar2++;
    }, interval);
  },

  setSettings: (context, settings) => {
    if (websocket) {
      const data = {
        event: "setSettings",
        context,
        payload: settings,
      };

      websocket.send(JSON.stringify(data));
    }
  },
  setState: (context, state) => {
    if (websocket) {
      const data = {
        event: "setState",
        context,
        payload: {
          state,
        },
      };

      websocket.send(JSON.stringify(data));
    }
  },
  showAlert: (context) => {
    if (websocket) {
      const data = {
        event: "showAlert",
        context,
      };

      websocket.send(JSON.stringify(data));
    }
  },
  log: (message) => {
    if (websocket) {
      const data = {
        event: "logMessage",
        payload: {
          message,
        },
      };

      websocket.send(JSON.stringify(data));
    }
  },
  openUrl: (url) => {
    if (websocket) {
      const data = {
        event: "openUrl",
        payload: {
          url,
        },
      };

      websocket.send(JSON.stringify(data));
    }
  },
  setImage: (context, image) => {
    if (websocket) {
      const data = {
        event: "setImage",
        context,
        payload: {
          image
        },
      };
      websocket.send(JSON.stringify(data));
    }
  },

  setFeedback: (context, icon, title, value, indicator) => {
    if (websocket) {
      const data = {
        event: "setFeedback",
        context,
        payload: {
          'title' : title,
          'value' : value,
          'indicator' : indicator,
          icon
        },
      };
      websocket.send(JSON.stringify(data));
    }
  },
};
