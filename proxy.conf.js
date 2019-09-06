require('dotenv').config();
const PROXY_CONFIG = {
  "/api/*": {
    "target": "http://localhost:3000",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      req.headers["origin"] = "http://localhost:3000";
    },
  }
};

module.exports = PROXY_CONFIG;
