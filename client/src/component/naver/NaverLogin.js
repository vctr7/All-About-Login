import React, { useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config';
const { naver } = window;
let val = false;

const naverLogin = new naver.LoginWithNaverId({
    clientId: config.NAVER_ID,
    callbackUrl: 'https://localhost:3000',
    callbackHandle: false,
    loginButton: { color: 'white', type: 1, height: 48 },
    isPopup: false,
});

function sendData(data) {
    if (val) {
        val = false;
    } else val = true;
}
function NaverLogin({ clientId, redirectUri }) {
    useEffect(() => {
        naverLogin.init();
        if (val) {
            val = false;
            window.addEventListener('load', function () {
                naverLogin.getLoginStatus(function (status) {
                    if (status) {
                        /* 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */

                        const data = naverLogin;
                        if (data == undefined || data == null) {
                            alert(
                                '이메일은 필수정보입니다. 정보제공을 동의해주세요.'
                            );
                            /* 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
                            naverLogin.reprompt();
                            return;
                        }
                        axios
                            .post('/api/callback/naver', { data: data })
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
                        // window.location.replace("http://localhost:3000");
                    } else {
                        console.log('callback 처리에 실패하였습니다.');
                    }
                });
            });
        } else val = true;
    });

    return <div onClick={()=>alert("Asd")}></div>;
}

export default NaverLogin;
