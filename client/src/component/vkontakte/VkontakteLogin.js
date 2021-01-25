import React from 'react';
import PopupWindow from '../../util/PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function VkontakteLogin({ logo, clientId, clientSecret, redirectUri, getLoginStatus }) {
    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            scope: 'email',
            redirect_uri: redirectUri,
            response_type: 'code',
        });
        console.log(`https://oauth.vk.com/authorize?${search}`);
        const popup = PopupWindow.open(
            `https://oauth.vk.com/authorize?${search}`
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
            const search = toQuery({
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
            });
            axios
                .get(`https://oauth.vk.com/access_token?${search}`)
                .then((res) => {
                    const access_token = res.data.access_token;
                    axios
                        .get(
                            `https://api.vk.com/method/users.get?v=5.126&access_token=${access_token}`
                        )
                        .then((res) => {
                            console.log(res);
                            const val = res.data.response['0'];
                            const username = `${val.first_name} ${val.last_name}`;
                            const email = 'no email';
                            const password = String(val.id);
                            const id = password;
                            axios
                                .post('/api/auth/register', {
                                    userId: id,
                                    password: password,
                                    userName: username,
                                    emailAddress: email,
                                    signBy: 'Vkontakte',
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
                                                getLoginStatus(true);
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
export default VkontakteLogin;
