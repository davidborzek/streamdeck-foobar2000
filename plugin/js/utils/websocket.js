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
  setTitle: (context, title) => {
    if (websocket) {
      const data = {
        event: "setTitle",
        context,
        payload: {
          title,
          target: DestinationEnum.HARDWARE_AND_SOFTWARE,
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
      var json = {
        event: "showAlert",
        context,
      };

      websocket.send(JSON.stringify(json));
    }
  },
};
