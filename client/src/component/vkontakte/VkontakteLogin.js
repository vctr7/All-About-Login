import React from 'react';
import PopupWindow from './PopupWindow';
import { toQuery } from '../../util/utils'

function VkontakteLogin({ logo, clientId, redirectUri }) {

    const onClick = () => {
        const search = toQuery({
            client_id: clientId,
            scope: 'email',
            redirect_uri: redirectUri + "/vkontakte",
            response_type: 'code',
        });
        console.log(`https://oauth.vk.com/authorize?${search}`)
        const popup = PopupWindow.open(
            `https://oauth.vk.com/authorize?${search}`,
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
export default VkontakteLogin;
