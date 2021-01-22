import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function TwitchLogin({ logo, clientId, clientSecret, redirectUri }) {
    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'user:edit%20user:read:email',
        });

        const popup = PopupWindow.open(
            `https://id.twitch.tv/oauth2/authorize?${search}`
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };

    const onSuccess = (data) => {
        if (!data) {
            onFailure(new Error('code not found'));
        } else {
            console.log('get code');
            console.log(data);
            const search = toQuery({
                client_id: clientId,
                client_secret: clientSecret,
                code: data.code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            });
            //accesstoken -> user info
            axios
                .post(
                    `https://cors-anywhere.herokuapp.com/https://id.twitch.tv/oauth2/token?${search}`
                )
                .then((res) => {
                    console.log(res.data.access_token);
                    const access_token = res.data.access_token;

                    const header = {
                        Authorization: 'Bearer ' + access_token,
                        'Client-Id': clientId,
                    };
                    axios
                        .get(
                            'https://cors-anywhere.herokuapp.com/https://api.twitch.tv/helix/users',
                            { headers: header }
                        )
                        .then((res) => {
                            const val = JSON.parse(res.request.response).data[
                                '0'
                            ];
                            const id = val.login;
                            const email = val.email;
                            const username = val.display_name;
                            const password = val.created_at;
                            axios
                                .post('/api/auth/register', {
                                    userId: id,
                                    password: password,
                                    userName: username,
                                    emailAddress: email,
                                    signBy: 'Twitch',
                                })
                                .then((res) => {
                                    if (res.status === 200) {
                                        console.log('sign up and sign in');
                                    } else {
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => {
                                    console.log(res.status);
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
                });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default TwitchLogin;
