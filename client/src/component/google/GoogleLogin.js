import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';



function GoogleLogin({ logo, clientId, redirectUri }) {
    const [scope, setScope] = useState('user-read-private');
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        setScope(scope);
    });

    const onClick = () => {
        if (hasToken) {
        } else {
        }
        console.log('google');

        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri + "/google",
            response_type: 'token',
            scope: "https://www.googleapis.com/auth/contacts.readonly",
        });
        console.log(`https://accounts.google.com/o/oauth2/v2/auth?${search}`)
        const popup = PopupWindow.open(
            `https://accounts.google.com/o/oauth2/v2/auth?${search}`,
            { height: 1000, width: 600 }
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };


    const onSuccess = (data) => {
        if (!data) {
            onFailure(new Error("'access_token' not found"));
        } else {
            console.log('get data');
            console.log(data);
            // setHasToken(true);
            // axios({
            //     url: 'https://api.spotify.com/v1/me',
            //     method: 'get',
            //     headers: {
            //         Authorization: 'Bearer ' + String(data.access_token),
            //     },
            // })
            //     .then((res) => {
            //         console.log('Fetch Data by access_token Completed');
            //         console.log(res);
            //     })
            //     .catch((err) =>
            //         console.error('Fetch Data by access_token Fail', err)
            //     );
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default GoogleLogin;
