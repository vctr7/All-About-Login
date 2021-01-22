import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'
import axios from 'axios';

function RedditLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            response_type: 'code',
            state: "asd213",
            redirect_uri: redirectUri,
            duration: 'permanent',
            scope: 'identity'
        });
        console.log(`https://www.reddit.com/api/v1/authorize?${search}`)
        const popup = PopupWindow.open(
            `https://www.reddit.com/api/v1/authorize?${search}`,
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
            const code = data.code;
            const headers = {
                Authorization: "Basic dG5BcFEtUU9MZkhNVFE6b0VRVUNjQmFsV0pQM2FyTlhQemdtSkVwWU1sY1pn",

            }
            const body = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            }
            fetch("https://www.reddit.com/api/v1/access_token",{
                method:"POST",
                headers:headers,
                body:body,
            }).then(res => console.log(res))
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default RedditLogin;
