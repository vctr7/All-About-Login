import React, { useEffect } from 'react';
import PopupWindow from './PopupWindow';
import axios from 'axios';
import url from 'url';
import qs from 'qs';
import querystring from 'querystring';
import jwt from 'jsonwebtoken';
import { toQuery } from '../../util/utils';


const maxAge = 120;

function LineLogin({ clientID, redirectURI, logo, state, nonce, clientSecret, setPayload, setIdToken }) {
    const onClick = () => {
        const search = toQuery({
            response_type: 'code',
            client_id: clientID,
            redirect_uri: redirectURI + '/line',
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
            onFailure(new Error('accessToken not found'));
        } else {
            console.log('get accessToken');
            console.log(data);
            // axios
            //     .post('/api/callback/line', { data: data })
            //     .then((res) => {
            //         if (res.status === 200) {
            //             console.log('success');
            //         } else {
            //             console.log('not error but problem');
            //         }
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };
    const lineLogin = () => {
        // Build query string.
        
        const query = querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            state: state,
            scope: 'profile%20openid%20email',
            nonce: nonce,
            prompt: 'consent',
            max_age: maxAge,
            bot_prompt: 'normal',
        });
        // Build the Line authorise URL.
        const lineAuthoriseURL =
            'https://access.line.me/oauth2/v2.1/authorize?' +
            query +
            '&redirect_uri=' +
            redirectURI;
        // Redirect to external URL.
        window.location.href = lineAuthoriseURL;
    };

    const getAccessToken = (callbackURL) => {
        var urlParts = url.parse(callbackURL, true);
        var query = urlParts.query;
        var hasCodeProperty = Object.prototype.hasOwnProperty.call(
            query,
            'code'
        );
        if (hasCodeProperty) {
            const reqBody = {
                grant_type: 'authorization_code',
                code: query.code,
                redirect_uri: redirectURI,
                client_id: clientID,
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
                    if (setPayload) setPayload(res.data);

                    try {
                        const decodedIdToken = jwt.verify(
                            res.data.id_token,
                            clientSecret,
                            {
                                algorithms: ['HS256'],
                                audience: clientID.toString(),
                                issuer: 'https://access.line.me',
                                nonce: nonce,
                            }
                        );

                        if (setIdToken) setIdToken(decodedIdToken);
                    } catch (err) {
                        // If token is invalid.
                        console.log(err);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // useEffect(() => {
    //     getAccessToken(window.location.href);
    // }, [clientID]);

    return (
        <img src={logo} onClick={onClick} className="Image" />
        // <div className={styles.App}>
        //     <div onClick={() => lineLogin()} className={styles.lineButton} />
        // </div>
    );
}
export default LineLogin;
