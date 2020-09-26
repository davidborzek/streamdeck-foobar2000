class CurrentVolumeAction extends Action {
  type = "com.davidborzek.foobar2000.currentvolume";

  constructor(context, settings, foobarCurrentVolume) {
    super(context, settings);
    this.foobarCurrentVolume = foobarCurrentVolume;
  }

  onKeyDown = (coordinates, state) => {};

  onKeyUp = (coordinates, state) => {};

  onWillAppear = (coordinates) => {
    websocketUtils.setTitle(
      this.context,
      `${Math.ceil(100 + this.foobarCurrentVolume)}`
    );
  };
}
