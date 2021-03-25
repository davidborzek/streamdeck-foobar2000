let websocket = null;
let pluginUUID = null;

let actions = {
  playPauseAction: new PlayPauseAction(),
  playAction: new PlayAction(),
  pauseAction: new PauseAction(),
  toggleMuteAction: new ToggleMuteAction(),
  currentVolumeAction: new CurrentVolumeAction(),
  skipForwardAction: new SkipForwardAction(),
  skipBackwardAction: new SkipBackwardAction(),
  volumeUpAction: new VolumeUpAction(),
  volumeDownAction: new VolumeDownAction(),
  stopAction: new StopAction(),
  nowPlayingAction: new NowPlayingAction(),
};

let contexts = {
  playPauseAction: [],
  toggleMuteAction: [],
  currentVolumeAction: [],
  nowPlayingAction: [],
};

let foobarPlayerState;

const connectElgatoStreamDeckSocket = (
  inPort,
  inPluginUUID,
  inRegisterEvent,
  inInfo
) => {
  pluginUUID = inPluginUUID;

  websocket = new WebSocket("ws://127.0.0.1:" + inPort);

  websocket.onopen = async () => {
    try {
      foobarPlayerState = await foobar.getPlayerState();
    } catch {
      websocketUtils.log(
        "Error to connect with foobar2000, check if foobar is running!"
      );
    }
    websocketUtils.registerPlugin(pluginUUID, inRegisterEvent);
  };

  websocket.onmessage = (evt) => {
    const { event, action, context, payload } = JSON.parse(evt.data);
    const { settings, coordinates } = payload || {};

    if (foobarPlayerState) {
      actions.currentVolumeAction.setCurrentVolume(
        foobarPlayerState.volume.value
      );
      actions.playPauseAction.setPlaybackState(foobarPlayerState.playbackState);
      actions.toggleMuteAction.setMuteStatus(foobarPlayerState.volume.isMuted);
      actions.volumeUpAction.setVolume(foobarPlayerState.volume.value);
      actions.volumeDownAction.setVolume(foobarPlayerState.volume.value);
      actions.nowPlayingAction.setCurrentPlayback(foobarPlayerState);
    }

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
    } else if (event === "willDisappear") {
      Object.keys(intervals).forEach((key) => {
        clearInterval(intervals[key]);
      });
      intervals = {};
    }
  };

  websocket.onclose = () => {
    // Websocket is closed
  };
};
