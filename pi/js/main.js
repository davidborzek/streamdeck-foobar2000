let websocket = null;

let globalSettings = {};

let settings = {};

const actions = Object.freeze({
  volumeUp: "com.davidborzek.foobar2000.volumeup",
  volumeDown: "com.davidborzek.foobar2000.volumedown",
  center: "com.davidborzek.foobar2000.center",
});

const connectElgatoStreamDeckSocket = (
  inPort,
  inUUID,
  inRegisterEvent,
  inInfo,
  inActionInfo
) => {
  const actionInfo = JSON.parse(inActionInfo);
  const info = JSON.parse(inInfo);

  const sdVersion = info.application.version;
  const pluginVersion = info.plugin.version;
  const language = info.application.language;
  const action = actionInfo.action;

  settings = actionInfo.payload.settings;

  websocket = new WebSocket("ws://127.0.0.1:" + inPort);

  websocket.onopen = function () {
    websocketUtils.registerPlugin(inUUID, inRegisterEvent);
    websocketUtils.requestGlobalSettings(inUUID);
  };

  if (action == actions.volumeUp || action == actions.volumeDown) {
    const volumeStepDiv = document.getElementById("volume-step");
    volumeStepDiv.style.display = "flex";

    const volumeStepInput = volumeStepDiv.children[1];
    volumeStepInput.value = settings.volumeStep || 1;
    volumeStepInput.onchange = (evt) => {
      if (
        evt.target.value === "" ||
        Number.parseInt(evt.target.value, 10) < 0
      ) {
        volumeStepInput.value = 1;
      } else if (Number.parseInt(evt.target.value, 10) > 100) {
        volumeStepInput.value = 100;
      }
      websocketUtils.saveSettings(action, inUUID, {
        volumeStep: Number.parseInt(volumeStepInput.value, 10),
      });
    };
  }

  if (action == actions.center) {
    const volumeStepDiv = document.getElementById("volume-step");
    volumeStepDiv.style.display = "flex";
    const dialTurnDiv = document.getElementById("dial-turn");
    dialTurnDiv.style.display = "flex";
    const titleInformationDiv = document.getElementById("title-information");
    titleInformationDiv.style.display = "flex";
    const valueInformationDiv = document.getElementById("value-information");
    valueInformationDiv.style.display = "flex";
    const iconInformationDiv = document.getElementById("icon-information");
    iconInformationDiv.style.display = "flex";

    const volumeStepInput = volumeStepDiv.children[1];
    volumeStepInput.value = settings.volumeStep || 1;
    volumeStepInput.onchange = (evt) => {
      if (
        evt.target.value === "" ||
        Number.parseInt(evt.target.value, 10) < 0
      ) {
        volumeStepInput.value = 1;
      } else if (Number.parseInt(evt.target.value, 10) > 100) {
        volumeStepInput.value = 100;
      }
      websocketUtils.saveSettings(action, inUUID, {
        volumeStep: Number.parseInt(volumeStepInput.value, 10),
      });
    };

    const dialTurnSelection = dialTurnDiv.children[1];
    dialTurnSelection.value = settings.dialTurnAction || "volume";
    const titleInformationSelection = titleInformationDiv.children[1];
    titleInformationSelection.value = settings.titleInformation || "track";
    const valueInformationSelection = valueInformationDiv.children[1];
    valueInformationSelection.value = settings.valueInformation || "artist";
    const iconInformationSelection = iconInformationDiv.children[1];
    iconInformationSelection.value = settings.iconInformation || "trackArt";

    onchange = (evt) => {
      websocketUtils.saveSettings(action, inUUID, {
        volumeStep: Number.parseInt(volumeStepInput.value, 10),
        dialTurnAction: dialTurnSelection.value,
        titleInformation: titleInformationSelection.value,
        valueInformation: valueInformationSelection.value,
        iconInformation: iconInformationSelection.value
      });
    };

    dialTurnSelection.onchange = onchange;
    titleInformationSelection.onchange = onchange;
    valueInformationSelection.onchange = onchange;
    iconInformationSelection.onchange = onchange;
  }

  const gettingStartedLink = document.getElementById("getting-started-link");
  gettingStartedLink.onclick = () => {
    websocketUtils.openUrl(
      "https://github.com/davidborzek/streamdeck-foobar2000/blob/master/docs/getting-started.md"
    );
  };

  websocket.onmessage = (evt) => {
    const { event, payload } = JSON.parse(evt.data);
    if (event == "didReceiveGlobalSettings") {
      globalSettings = payload.settings;
    } else if (event == "didReceiveSettings") {
      settings = payload.settings;
    }
  };
};
