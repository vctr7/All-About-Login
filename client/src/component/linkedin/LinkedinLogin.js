import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';

function LinkedinLogin({ logo, clientId, redirect_uri }) {
    const [scope, setScope] = useState('r_liteprofile%20r_emailaddress');

    useEffect(() => {
        setScope(scope);
    }, []);

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: redirect_uri+"/linkedin",
            scope: scope,
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
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default LinkedinLogin;
