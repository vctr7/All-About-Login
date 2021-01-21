import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function TwitchLogin({ logo, clientId }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: 'https://localhost:3000',
            response_type: 'token',
            scope: 'user:edit%20user:read:email',
        });

        const popup = PopupWindow.open(
            `https://id.twitch.tv/oauth2/authorize?${search}`
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
            axios
                .post('/api/callback/twitch', { data: data })
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
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default TwitchLogin;
