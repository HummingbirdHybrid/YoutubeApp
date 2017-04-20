const OAUTH2_CLIENT_ID = '106267978564-jp19bjfkvaecgs905lnj7e9dn9mkcjhv.apps.googleusercontent.com';
const OAUTH2_API_KEY = 'AIzaSyBLhjGs-fTY64swcHFsyQgxcpWj4r3-zDA';
const OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube'
];

const YT = require('./YTapi.js');
const $ = require('./jquery');

window.init = function () {
    gapi.client.setApiKey(OAUTH2_API_KEY);
    gapi.client.load("youtube", "v3", function () {
        GUI.init();
    });
};
var GUI = {};
GUI = {
  init: function () {
    GUI._initButton();
  },
  _initButton:function () {
      var searchButton = $("form");
      searchButton.on('submit', YT.videoSearch);
  }
};


