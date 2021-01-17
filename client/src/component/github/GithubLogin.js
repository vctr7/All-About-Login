import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function GithubLogin({ logo, clientId, redirectUri }) {
    const [scope, setScope] = useState('user');

    useEffect(() => {
        setScope(scope);
    }, []);

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            scope,
            redirect_uri: redirectUri + "/github",
        });
        const popup = PopupWindow.open(
            'github-oauth-authorize',
            `https://github.com/login/oauth/authorize?client_id=${clientId}`,
            { height: 1000, width: 600 }
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
export default GithubLogin;
