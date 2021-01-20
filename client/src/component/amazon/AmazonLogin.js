import React, { useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config';

const options = {
    scope: 'profile',
    scope_data: { profile: { essential: false } },
};
function AmazonLogin({ logo }) {
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
            amazon.Login.authorize(options, (data) => {
                if (data.error) {
                    alert('oauth error ' + data.error);
                    return;
                }
                // console.log(data);
                axios
                    .post('/api/callback/amazon', { data: data })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('success');
                        } else {
                            console.log('not error but problem');
                        }
                    })
                    .catch((e) => console.log(e));
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
            <img onClick={onClick} className="Image" src={logo} alt="logo" />
    );
}
export default AmazonLogin;
