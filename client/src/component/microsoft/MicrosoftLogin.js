import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils';
import axios from 'axios';

function MicrosoftLogin({ logo, clientId }) {
    const [scope, setScope] = useState('user.read');

    useEffect(() => {
        setScope(scope);
    }, []);

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            redirect_uri: 'http://localhost:3000',
            scope: scope,
            response_type: 'token',
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
            // console.log(data);
            axios
                .post('/api/callback/microsoft', { data: data })
                .then((res) => {
                    if (res.status === 200) {
                        console.log('success');
                    } else {
                        console.log('not error but problem');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default MicrosoftLogin;
