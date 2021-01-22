import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'
import axios from 'axios';

function YahooLogin({ logo, clientId, clientSecret, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
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
            const code = data.code;
            const body = {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            };

            const headers = {
                Authorization: "Basic ZGoweUptazlkSFkzWnpKTFFrMUJkbEZNSm1ROVdWZHJPV05zU2t0VVJGb3dXa1ZWYldOSGJ6bE5RVDA5Sm5NOVkyOXVjM1Z0WlhKelpXTnlaWFFtYzNZOU1DWjRQVFEyOjAzNWM1ZDIxNjc3ZGFiMTYyMjhjMzZjMGE2MGVmYjA0NDMxMDg1Mzk=",
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'X-Requested-With':'XMLHttpRequest'
            }

            axios.post('https://cors-anywhere.herokuapp.com/https://api.login.yahoo.com/oauth2/get_token', {
                headers:headers,
                body: body
            }).then(res => {
                console.log(res)
            })
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default YahooLogin;
