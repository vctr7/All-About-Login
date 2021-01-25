import React, { useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config';

const options = {
    scope: 'profile',
    scope_data: { profile: { essential: false } },
};
function AmazonLogin({ logo, getLoginStatus }) {
    useEffect(() => {
        //lwa(login with amazon) SDK
        ((d) => {
            var a = d.createElement('script');
            a.type = 'text/javascript';
            a.async = true;
            a.id = 'amazon-login-sdk';
            a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
            d.getElementById('amazon-root').appendChild(a);
        })(document);
        window.onAmazonLoginReady = () => {
            try {
                let { amazon } = window;
                amazon.Login.setClientId(config.AMAZON_ID);
            } catch (err) {
                console.log(err);
            }
        };
    }, []);

    const onClick = () => {
        try {
            let { amazon } = window;
            amazon.Login.authorize(options, function (response) {
                if (response.error) {
                    alert('oauth error ' + response.error);
                    return;
                }
                amazon.Login.retrieveProfile(
                    response.access_token,
                    function (res) {
                        // console.log(response)
                        const username = res.profile.Name;
                        const email = res.profile.PrimaryEmail;
                        const password = res.profile.CustomerId;
                        const id = res.profile.CustomerId;
                        axios
                            .post('/api/auth/register', {
                                userId: id,
                                password: password,
                                userName: username,
                                emailAddress: email,
                                signBy: 'Amazon',
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log('sign up and sign in');
                                    getLoginStatus(true);
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
                                            getLoginStatus(true);
                                        } else {
                                            console.log(
                                                'not error but problem'
                                            );
                                        }
                                    })
                                    .catch((e) => console.log(e));
                            });
                    }
                );
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default AmazonLogin;
