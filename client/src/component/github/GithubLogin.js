import React, { useEffect, useState } from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function GithubLogin({ logo, clientId, redirectUri }) {
    const [scope, setScope] = useState('user');
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        setScope(scope);
    });

    const onClick = () => {
        // if (hasToken) {
        // } else {
        // }
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
            // setHasToken(true);
            // const response = await axios.post(
            //     'https://github.com/login/oauth/access_token',
            //     {
            //       code,
            //       client_id, // 내 APP의 정보
            //       client_secret, // 내 APP의 정보
            //     },
            //     {
            //       headers: {
            //         accept: 'application/json',
            //       },
            //     },
            //   );
            // axios({
            //     url: 'https://github.com/login/oauth/access_token',
            //     method: 'get',
            //     headers: {
            //         Authorization: 'Bearer ' + String(data.access_token),
            //     },
            // })
            //     .then((res) => {
            //         console.log('Fetch Data by access_token Completed');
            //         console.log(res);
            //     })
            //     .catch((err) =>
            //         console.error('Fetch Data by access_token Fail', err)
            //     );
        }
    };

    const onFailure = (error) => {
        console.error(error);
    };

    return <img onClick={onClick} className="Image" src={logo} alt="logo" />;
}
export default GithubLogin;
