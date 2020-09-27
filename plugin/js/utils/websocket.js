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
};
