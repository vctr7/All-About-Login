import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';
import request from 'request';
function SpotifyLogin({ logo, clientId, clientSecret, redirectUri }) {
    const onClick = () => {
        console.log('spotify');
        const search = toQuery({
            client_id: clientId,
            scope: 'user-read-email user-read-private',
            redirect_uri: redirectUri,
            response_type: 'code',
        });

        const popup = PopupWindow.open(
            'spotify-authorization',
            `https://accounts.spotify.com/authorize?${search}`
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };

    const onSuccess = (data) => {
        if (!data) {
            onFailure(new Error("'access_token' not found"));
        } else {
            console.log('get access_token');
            console.log(data);
            const code = data.code;

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                },
                headers: {
                    Authorization:
                        'Basic ' +
                        Buffer.from(clientId + ':' + clientSecret).toString(
                            'base64'
                        ),
                },
                json: true,
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    const access_token = body.access_token,
                        refresh_token = body.refresh_token;

                    const options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: { Authorization: 'Bearer ' + access_token },
                        json: true,
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, function (error, response, body) {
                        console.log(body);
                        const username = body.display_name;
                        const email = body.email;
                        const id = body.id;
                        const password = body.id;
                        axios
                            .post('/api/auth/register', {
                                userId: id,
                                password: password,
                                userName: username,
                                emailAddress: email,
                                signBy: 'Spotify',
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log('sign up and sign in');
                                } else {
                                    console.log('not error but problem');
                                }
                            })
                            .catch((e) => {
                                axios
                                    .post('/api/auth/login', {
                                        userId: id,
                                        password: password,
                                    })
                                    .then((res) => {
                                        if (res.status === 200) {
                                            console.log('sign in');
                                        } else {
                                            console.log(
                                                'not error but problem'
                                            );
                                        }
                                    })
                                    .catch((e) => console.log(e));
                            });
                    });
                }
            });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default SpotifyLogin;
