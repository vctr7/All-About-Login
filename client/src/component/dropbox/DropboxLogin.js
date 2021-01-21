import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function DropboxLogin({ logo, clientId, redirectUri }) {
    // const [scope, setScope] = useState('email');

    // useEffect(() => {
    //     setScope(scope);
    // }, []);

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirectUri + "/dropbox",
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
            console.log('get accessToken');
            console.log(data);
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default DropboxLogin;
