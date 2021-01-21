import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function SlackLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri + "/slack",
            user_scope:'identity.basic%20identity.email'
        });
        console.log(`https://slack.com/oauth/v2/authorize?${search}`)
        const popup = PopupWindow.open(
            `https://slack.com/oauth/v2/authorize?${search}`,
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
export default SlackLogin;
