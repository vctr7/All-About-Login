import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';

function SpotifyLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        console.log('spotify');
        const search = toQuery({
            client_id: clientId,
            scope: 'user-read-private',
            redirect_uri: redirectUri + "/spotify",
            response_type: 'code',
        });

        const popup = PopupWindow.open(
            'spotify-authorization',
            `https://accounts.spotify.com/authorize?${search}`,
        );

        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };


    const onSuccess = (data) => {
        if (!data.access_token) {
            onFailure(new Error("'access_token' not found"));
        } else {
            console.log('get access_token');
            console.log(data);
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default SpotifyLogin;
