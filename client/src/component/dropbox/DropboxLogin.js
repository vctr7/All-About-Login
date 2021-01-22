import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'
import axios from 'axios';

function DropboxLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
        });
        console.log(`https://www.dropbox.com/oauth2/authorize?${search}`)
        const popup = PopupWindow.open(
            `https://www.dropbox.com/oauth2/authorize?${search}`,
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
            // console.log('get accessToken');
            console.log(data.code)
            const code = data.code
            const body = {
                code: code,
                grant_type:'authorization_code',
                redirect_uri: redirectUri
            }
            const headers = {
                Authorization: 'Basic c3A0eG5na3Zzc3prZDhmOngwaWx0dDVvbTJnZjJzcg==',
                'Access-Control-Allow-Origin': '*'
            }
            fetch('https://api.dropbox.com/1/oauth2/token', {
                method: 'POST',
                headers: headers,
                body: body,
            }).then(res=> console.log(res))
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default DropboxLogin;
