import React from 'react';
import axios from 'axios';

const { Kakao } = window;
function KakaonLogin({ logo }) {
    const onClick = () => {
        try {
            Kakao.Auth.login({
                scope: 'account_email',
                success: (data) => {
                    Kakao.API.request({
                        url: '/v2/user/me',
                        success: function (res) {
                            const username = res.properties.nickname;
                            const email = res.kakao_account.email;
                            const password = String(res.id);
                            const id = password;

                            axios
                                .post('/api/auth/register', {
                                    userId: id,
                                    password: password,
                                    userName: username,
                                    emailAddress: email,
                                    signBy: 'Kakao',
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
                        },
                        fail: function (error) {
                            console.log(error);
                        },
                    });
                },
                fail: function (error) {
                    console.log(error);
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default KakaonLogin;
