class Action {
  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
  }

  getContext = () => {
    return this.context;
  };

  setContext = (context) => {
    this.context = context;
  };

  getSettings = () => {
    return this.settings;
  };

  setSettings = (settings) => {
    this.settings = settings;
  };
}
