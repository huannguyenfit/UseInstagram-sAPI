"use strict";
//var $ = require("./js/plugins/jquery-1.12.2.min");
var InstagramAPI = /** @class */ (function () {
    function InstagramAPI() {
    }
    InstagramAPI.prototype.GetAccessToken = function (client_id, redirect_uri) {
        window.location.href = 'http://api.instagram.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token'
    };
    InstagramAPI.prototype.GetInformationByUsername = function (access_token, username, callback) {
        var result;
        $.ajax({
            url: 'https://api.instagram.com/v1/users/search',
            dataType: 'jsonp',
            type: 'GET',
            async: 'false',
            data: { access_token: access_token, q: username },
            success: function (data) {
               $.ajax({
                      url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent',
                      dataType: 'jsonp',
                      type: 'GET',
                      async: 'false',
                      data: {access_token: access_token, count: 30},
                      success: function(data2) {
                            console.log(data2.data);
                            callback(data2.data);
                          },
                      error: function(data2) {
                          callback(null);
                      }
                  });
            },
            error: function (data) {
               
                callback(null);
            }
        });
        callback(result);
    };
    return InstagramAPI;
}());
