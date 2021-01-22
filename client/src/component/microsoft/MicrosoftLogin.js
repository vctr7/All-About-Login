import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';




function MicrosoftLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_mode: 'query',
            scope: 'user.read',
            response_type: 'code',
            code_challenge: 'WsEH2Rr4lWdciBEbCuHVlH_UIBUGFPRbDXcPsb-Pl74',
            code_challenge_method: 'S256',
        });
        const popup = PopupWindow.open(
            `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${search}`
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
            const search = toQuery({
                client_id: clientId,
                scope: 'user.read',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
                code_verifier: 'WsEH2Rr4lWdciBEbCuHVlH_UIBUGFPRbDXcPsb-Pl74',
            });
            const d = {
                client_id: clientId,
                scope: 'https://graph.microsoft.com/mail.read',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            };
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            fetch(
                `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
                {
                    method: 'POST',
                    headers: headers,
                    body: search
                }
            ).then((res) => console.log(res));
            // axios
            //     .post(`https://login.microsoftonline.com/common/oauth2/v2.0/token?${search}`)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             console.log('success');
            //             console.log(res)
            //         } else {
            //             console.log('not error but problem');
            //         }
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default MicrosoftLogin;
