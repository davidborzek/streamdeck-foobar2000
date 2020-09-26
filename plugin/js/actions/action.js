class Action {
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
