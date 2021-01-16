import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';




function SpotifyLogin({ logo, clientId, redirectUri }) {
    const [scope, setScope] = useState('user-read-private');
    const [hasToken, setHasToken] = useState(false);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    useEffect(() => {
        setScope(scope);
    });

    const onClick = () => {
        if (hasToken) {
        } else {
        }
        console.log('spotify');

        const search = toQuery({
            client_id: clientId,
            scope,
            redirect_uri: redirectUri + "/spotify",
            response_type: 'code',
        });
        // axios.get('/spotifyoauth').then((res) => console.log(res)).catch(err => console.log(err));
        const popup = PopupWindow.open(
            'spotify-authorization',
            `https://accounts.spotify.com/authorize?${search}`,
            { height: 1000, width: 600 }
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
        //     setHasToken(true);
        //     axios({
        //         url: 'https://api.spotify.com/v1/me',
        //         method: 'get',
        //         headers: {
        //             Authorization: 'Bearer ' + String(data.access_token),
        //         },
        //     })
        //         .then((res) => {
        //             console.log('Fetch Data by access_token Completed');
        //             console.log(res);
        //         })
        //         .catch((err) =>
        //             console.error('Fetch Data by access_token Fail', err)
        //         );
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default SpotifyLogin;
