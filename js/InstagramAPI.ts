import * as $ from 'jquery'

export class InstagramAPI {
    constructor() {

    }    
    
    public GetAccessToken(client_id: string, redirect_uri:string): string {
        window.location.href = 'http://api.instagram.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token'
    }

    public GetInformationByUsername(access_token:string, username:string, callback: (x: Array<any>) => void): Array<any> {      
        $.ajax({ 
            url: 'https://api.instagram.com/v1/users/search',
            dataType: 'jsonp',
            type: 'GET',
            async: 'false',
            data: {access_token: access_token, q: username},                                
            success: function(data){
              $.ajax({
                    url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent', // specify the ID of the first found user
                    dataType: 'jsonp',
                    type: 'GET',
                     async: 'false',
                    data: {access_token: access_token, count: 30},
                    success: function(data2){
                            console.log(data2);
                            callback(data2.data);
                        },
                    error: function(data2){
                        console.log(data2);
                        callback(null);
                    }
                });
            },
            error: function(data){
                console.log(data);
                callback(null);
            }
        });
        callback(null);
    }
}