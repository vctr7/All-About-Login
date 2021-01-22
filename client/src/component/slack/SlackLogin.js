import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';

function SlackLogin({ logo, clientId, clientSecret, redirectUri }) {
    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
            user_scope: 'identity.basic%20identity.email',
        });
        console.log(`https://slack.com/oauth/v2/authorize?${search}`);
        const popup = PopupWindow.open(
            `https://slack.com/oauth/v2/authorize?${search}`
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
            console.log(data);
            const code = data.code;

            const body = new FormData();
            body.append('code', code);
            body.append('client_id', clientId);
            body.append('client_secret', clientSecret);

            fetch('https://slack.com/api/oauth.v2.access', {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res=>console.log(res));
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default SlackLogin;
