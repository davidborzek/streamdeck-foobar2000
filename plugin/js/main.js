let websocket = null;
let pluginUUID = null;

let actions;

let contexts = {
  playPauseAction: [],
};

const DestinationEnum = Object.freeze({
  HARDWARE_AND_SOFTWARE: 0,
  HARDWARE_ONLY: 1,
  SOFTWARE_ONLY: 2,
});

const connectElgatoStreamDeckSocket = (
  inPort,
  inPluginUUID,
  inRegisterEvent,
  inInfo
) => {
  pluginUUID = inPluginUUID;

  websocket = new WebSocket("ws://127.0.0.1:" + inPort);

  websocket.onopen = () => {
    websocketUtils.registerPlugin(pluginUUID, inRegisterEvent);
  };

  websocket.onmessage = async (evt) => {
    const { event, action, context, payload } = JSON.parse(evt.data);
    const { settings, coordinates } = payload || {};

    const foobarPlayerState = await foobar.getPlayerState();

    actions = {
      playPauseAction: new PlayPauseAction(
        context,
        settings,
        foobarPlayerState.playbackState
      ),
    };

    if (event === "keyDown" || event === "keyUp") {
      const { state } = payload;
      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          event === "keyDown"
            ? actions[key].onKeyDown(coordinates, state)
            : actions[key].onKeyUp(coordinates, state);
        }
      });
    } else if (event == "willAppear") {
      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          contexts[key].push(context);
          actions[key].onWillAppear(coordinates);
        }
      });
    }
  };

  websocket.onclose = () => {
    // Websocket is closed
  };
};