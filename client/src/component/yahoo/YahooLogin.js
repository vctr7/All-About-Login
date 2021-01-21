import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function YahooLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri + "/yahoo",
            response_type: 'code',
        });

        const popup = PopupWindow.open(
            `https://api.login.yahoo.com/oauth2/request_auth?${search}`,
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
export default YahooLogin;
