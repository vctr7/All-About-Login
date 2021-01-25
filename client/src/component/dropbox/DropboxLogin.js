import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'
import axios from 'axios';


function DropboxLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        // axios.post('/api/auth/dropbox', { authorize_url:'https://www.dropbox.com/oauth2/authorize', token_url: 'https://api.dropbox.com/1/oauth2/token', client_id:clientId, redirect_uri:redirectUri,credential: 'c3A0eG5na3Zzc3prZDhmOngwaWx0dDVvbTJnZjJzcg=='})
        const search = toQuery({
            client_id: clientId,
            redirect_uri: 'https://localhost:8795/api/auth/dropbox',
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
            // console.log(data.code)
            // const code = data.code
            // axios.post("/api/auth/dropbox", {code: code})
    //         const body = {
    //             code: code,
    //             grant_type:'authorization_code',
    //             redirect_uri: 'https://localhost:8795/api/auth/dropbox'
    //         }
    //         const headers = {
    //             Authorization: 'Basic c3A0eG5na3Zzc3prZDhmOngwaWx0dDVvbTJnZjJzcg==',
    //             contentType: "application/x-www-form-urlencoded"
    //         }
    //         axios.post('/api/auth/dropbox', { url:'https://api.dropbox.com/1/oauth2/token', headers: headers, body: body })
    //         // fetch('https://api.dropbox.com/1/oauth2/token', {
    //         //     method: 'POST',
    //         //     headers: headers,
    //         //     body: body,
    //         // }).then(res=> console.log(res))
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default DropboxLogin;
