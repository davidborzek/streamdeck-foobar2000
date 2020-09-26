/* var eventSource = new EventSource(
  "http://localhost:8880/api/query/updates?player=true&trcolumns=%25artist%25%20-%20%25title%25%2C%25artist%25%20-%20%25album%25%20-%20%25title%25&playlists=true&playlistItems=true&plref=p1&plcolumns=%25artist%25%2C%25title%25&plrange=0%3A100"
);

eventSource.onmessage = function (e) {
  console.log(e);
}; */

////////////////////////////////////////////////////

let websocket = null;
let pluginUUID = null;

let actions;

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
      const { userDesiredState } = payload;

      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          event === "keyDown"
            ? actions[key].onKeyDown(coordinates, userDesiredState)
            : actions[key].onKeyUp(coordinates, userDesiredState);
        }
      });
    } else if (event == "willAppear") {
      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          actions[key].onWillAppear(coordinates);
        }
      });
    }
  };

  websocket.onclose = () => {
    // Websocket is closed
  };
};
