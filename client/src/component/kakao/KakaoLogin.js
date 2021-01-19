import React from 'react';
import axios from 'axios';
import * as config from '../../config';

const { Kakao } = window;
function KakaonLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        try {
            // Kakao.Auth.authorize({
            //     redirectUri: redirectUri + '/kakao',
            // });
            Kakao.Auth.login({
                scope: 'account_email',
                success:  (data) => {
                    console.log(data);
                    Kakao.API.request({
                        url: '/v2/user/me',
                        success: function(response) {
                            console.log(response);
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                    axios
                        .post('/api/callback/kakao', { data: data })
                        .then((res) => {
                            if (res.status === 200) {
                                console.log('success');
                            } else {
                                console.log('not error but problem');
                            }
                        })
                        .catch((e) => {
                            console.log(e);
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
