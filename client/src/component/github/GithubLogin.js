import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function GithubLogin({ logo, clientId, clientSecret, redirectUri }) {
    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            scope: 'user',
            redirect_uri: redirectUri,
        });
        const popup = PopupWindow.open(
            'github-oauth-authorize',
            `https://github.com/login/oauth/authorize?client_id=${clientId}`,
            { height: 1000, width: 600 }
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };

    const onSuccess = (data) => {
        const search = toQuery({
            client_id: clientId,
            client_secret: clientSecret,
            code: data.code,
            redirect_uri: redirectUri,
            state: 'githubvctr',
        });
        if (!data) {
            onFailure(new Error('code not found'));
        } else {
            console.log('get code');
            const headers = {
                Accept: 'application/json',
            };
            //accesstoken -> user info
            axios
                .post(
                    `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?${search}`,
                    {
                        headers: headers,
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    const access_token = res.data.split('&')[0].split('=')[1];
                    console.log(access_token);

                    const header = {
                        Authorization: 'token ' + access_token,
                    };
                    axios
                        .get(
                            'https://cors-anywhere.herokuapp.com/https://api.github.com/user',
                            { headers: header }
                        )
                        .then((res) => {
                            // login //register
                            const id = res.data.login;
                            const password = res.data.created_at;
                            const email = res.data.email;
                            const username = res.data.name;
                            axios
                                .post('/api/auth/register', {
                                    userId: id,
                                    password: password,
                                    userName: username,
                                    emailAddress: email,
                                    signBy: 'Github',
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
                                    console.log('sign in');
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
export default GithubLogin;
