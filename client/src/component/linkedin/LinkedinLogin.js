import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import { head } from 'request';

function LinkedinLogin({ logo, clientId, clientSecret, redirect_uri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirect_uri,
            scope: 'r_liteprofile%20r_emailaddress',
            response_type: 'code',
        });
        const popup = PopupWindow.open(
            `https://www.linkedin.com/oauth/v2/authorization?${search}`
        );
        popup.then(
            (data) => onSuccess(data),
            (error) => onFailure(error)
        );
    };

    const onSuccess = (data) => {
        if (!data) {
            onFailure(new Error('code not found'));
        } else {
            console.log(data);
            const code = data.code;
            const body = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: clientId,
                client_secret: clientSecret
            }
            const headers = {
                'Content-Type': 'x-www-form-urlencoded'
            }

            fetch("https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken",{
                method: "POST",
                headers: headers,
                body: body
            }).then(res => console.log(res))
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default LinkedinLogin;
