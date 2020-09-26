let websocket = null;
let pluginUUID = null;

let actions = {
  playPauseAction: new PlayPauseAction(),
  toggleMuteAction: new ToggleMuteAction(),
  currentVolumeAction: new CurrentVolumeAction(),
  skipForwardAction: new SkipForwardAction(),
  skipBackwardAction: new SkipBackwardAction(),
  volumeUpAction: new VolumeUpAction(),
};

let contexts = {
  playPauseAction: [],
  toggleMuteAction: [],
  currentVolumeAction: [],
};

let foobarPlayerState;

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

  websocket.onopen = async () => {
    foobarPlayerState = await foobar.getPlayerState();
    websocketUtils.registerPlugin(pluginUUID, inRegisterEvent);
  };

  websocket.onmessage = (evt) => {
    const { event, action, context, payload } = JSON.parse(evt.data);
    const { settings, coordinates } = payload || {};

    actions.currentVolumeAction.setCurrentVolume(
      foobarPlayerState.volume.value
    );
    actions.playPauseAction.setPlaybackState(foobarPlayerState.playbackState);
    actions.toggleMuteAction.setMuteStatus(foobarPlayerState.volume.isMuted);
    actions.volumeUpAction.setVolume(foobarPlayerState.volume.value);

    Object.keys(actions).forEach((key) => {
      if (actions[key].type === action) {
        actions[key].setContext(context);
        actions[key].setSettings(settings);
      }
    });

    if (event === "keyDown" || event === "keyUp") {
      const { state } = payload;
      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          event === "keyDown"
            ? actions[key].onKeyDown &&
              actions[key].onKeyDown(coordinates, state)
            : actions[key].onKeyUp && actions[key].onKeyUp(coordinates, state);
        }
      });
    } else if (event == "willAppear") {
      Object.keys(actions).forEach((key) => {
        if (actions[key].type === action) {
          contexts[key] && contexts[key].push(context);
          actions[key].onWillAppear && actions[key].onWillAppear(coordinates);
        }
      });
    }
  };

  websocket.onclose = () => {
    // Websocket is closed
  };
};
