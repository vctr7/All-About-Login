import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function DiscordLogin({ logo, clientId, clientSecret, redirectUri }) {
    const onClick = () => {
        const search = toQuery({
            response_type: 'code',
            client_id: clientId,
            scope: 'identify%20email',
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            prompt: 'consent',
        });

        const popup = PopupWindow.open(
            `https://discord.com/api/oauth2/authorize?${search}`
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };

    const onSuccess = (data) => {
        if (!data) {
            onFailure(new Error('accessToken not found'));
        } else {
            const code = data.code;
            const params = {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                scope: 'identify email',
            };
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            fetch(
                'https://cors-anywhere.herokuapp.com/https://discord.com/api/oauth2/token',
                {
                    method: 'POST',
                    body: new URLSearchParams(params),
                    headers: headers,
                }
            )
                .then((res) => res.json())
                .then((info) =>
                    axios.get(
                        'https://cors-anywhere.herokuapp.com/https://discord.com/api/users/@me',
                        {
                            headers: {
                                authorization: `${info.token_type} ${info.access_token}`,
                            },
                        }
                    )
                )
                .then((res) => {
                    const val = res.data;
                    const email = val.email;
                    const username = val.username;
                    const id = val.id;
                    const password = val.id;
                    axios
                        .post('/api/auth/register', {
                            userId: id,
                            password: password,
                            userName: username,
                            emailAddress: email,
                            signBy: 'Discord',
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
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => console.log(e));
                        });
                });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default DiscordLogin;
