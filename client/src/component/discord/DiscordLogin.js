import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';

function DiscordLogin({ logo, clientId, clientSecret, redirectUri }) {
    const [scope, setScope] = useState('identify%20email');

    useEffect(() => {
        setScope(scope);
    }, []);

    const onClick = () => {
        const search = toQuery({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri + '/discord',
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
            console.log('get accessToken');
            console.log(data);
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default DiscordLogin;
