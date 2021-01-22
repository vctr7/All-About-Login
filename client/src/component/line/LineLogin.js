import React from 'react';
import PopupWindow from './PopupWindow';
import axios from 'axios';
import url from 'url';
import qs from 'qs';
import querystring from 'querystring';
import jwt from 'jsonwebtoken';
import { toQuery } from '../../util/utils';

const maxAge = 120;

function LineLogin({
    clientId,
    redirectURI,
    logo,
    state,
    nonce,
    clientSecret,
    setPayload,
    setIdToken,
}) {
    const onClick = () => {
        const search = toQuery({
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectURI,
            state: '12345abcde',
            scope: 'profile%20openid%20email',
            prompt: 'consent',
            max_age: maxAge,
        });

        const popup = PopupWindow.open(
            `https://access.line.me/oauth2/v2.1/authorize?${search}`
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
            const code = data.code;

            const reqBody = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectURI,
                client_id: clientId,
                client_secret: clientSecret,
            };
            const reqConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            axios
                .post(
                    'https://api.line.me/oauth2/v2.1/token',
                    qs.stringify(reqBody),
                    reqConfig
                )
                .then((res) => {
                    const access_token = res.data.access_token;

                    axios
                        .get('https://api.line.me/v2/profile', {
                            headers: {
                                Authorization: 'Bearer ' + access_token,
                            },
                        })
                        .then((d) => {
                            const username = d.data.displayName;
                            const email = 'no email';
                            const id = d.data.userId;
                            const password = id;
                            axios
                                .post('/api/auth/register', {
                                    userId: id,
                                    password: password,
                                    userName: username,
                                    emailAddress: email,
                                    signBy: 'Line',
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
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return (
        <img src={logo} onClick={onClick} className="Image" />
        // <div className={styles.App}>
        //     <div onClick={() => lineLogin()} className={styles.lineButton} />
        // </div>
    );
}
export default LineLogin;
