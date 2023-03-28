const proxy = {
  _proxy: {
    proxy: {
      "/api/(.*)": "http://192.168.188.84:8080",
    },
    changeHost: true,
  }
};

module.exports = proxy;