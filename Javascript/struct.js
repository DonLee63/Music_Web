const SharedData = {
  data: {},
  init: function () {
    const storedData = localStorage.getItem("sharedData");
    if (storedData) {
      this.data = JSON.parse(storedData);
    }
  },
  setItem: function (key, value) {
    this.data[key] = value;
    localStorage.setItem("sharedData", JSON.stringify(this.data));
  },
  getItem: function (key) {
    return this.data[key];
  },
};
SharedData.init();