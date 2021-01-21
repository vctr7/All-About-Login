import React, { useEffect, useState } from 'react';
import './Logo.css';
import Amazon from '../logo/amazon.png';
import apple from '../logo/apple.png';
import discord from '../logo/discord.png';
import facebook from '../logo/facebook.png';
import github from '../logo/github.png';
import google from '../logo/google.png';
import kakao from '../logo/kakao.png';
import line from '../logo/line.png';
import linkedin from '../logo/linkedin.png';
import microsoft from '../logo/microsoft.png';
import naver from '../logo/naver.png';
import spotify from '../logo/spotify.png';
import twitch from '../logo/twitch.png';
import twitter from '../logo/twitter.png';

import NaverLogin from './naver/NaverLogin';
import KakaoLogin from './kakao/KakaoLogin';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from 'react-twitter-login';
import TwitchLogin from './twitch/TwitchLogin';
import GithubLogin from './github/GithubLogin';
import LinkedinLogin from './linkedin/LinkedinLogin';
import MicrosoftLogin from './microsoft/MicrosoftLogin';
import SpotifyLogin from './spotify/SpotifyLogin';
import AmazonLogin from './amazon/AmazonLogin';
import DiscordLogin from './discord/DiscordLogin';
import LineLogin from './line/LineLogin';

import * as config from '../config';
import axios from 'axios';

function Logo({ userState }) {
    const logos = [
        Amazon,
        apple,
        github,
        twitch,
        discord,
        facebook,
        linkedin,
        microsoft,
        twitter,
        spotify,
        naver,
        line,
        kakao,
        google,
    ];
    const [click, setClick] = useState(false);

    const redirectUri = 'https://localhost:8795/api/callback';

    const deg = 360 / logos.length;

    const logosStyle = (idx) => {
        return {
            backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            transform: 'rotate(' + String(idx * deg) + 'deg)',
        };
    };

    const Login = (i, logo) => {
        switch (i) {
            case 0:
                return <AmazonLogin logo={logo} />;

            case 2:
                return (
                    <GithubLogin
                        logo={logo}
                        clientId={config.GITHUB_ID}
                        redirectUri={redirectUri}
                    />
                );

            case 3:
                return (
                    <TwitchLogin
                        logo={logo}
                        clientId={config.TWITCH_ID}
                        redirectUri={redirectUri}
                    />
                );

            case 4:
                return (
                    <DiscordLogin
                        logo={logo}
                        clientId={config.DISCORD_ID}
                        clientSecret={config.DISCORD_SECRET}
                        redirectUri={redirectUri}
                    />
                );

            case 5:
                return (
                    <FacebookLogin
                        appId={config.FACEBOOK_ID}
                        autoLoad={false}
                        fields="name,first_name,last_name,email"
                        redirectUri={redirectUri + '/facebook'}
                        callback={(data) => {
                            axios
                                .post('/api/callback/facebook', { data: data })
                                .then((res) => {
                                    if (res.status === 200) {
                                        console.log('success');
                                    } else {
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => console.log(e));
                        }}
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                    />
                );
            case 6:
                return (
                    <LinkedinLogin
                        clientId={config.LINKEDIN_ID}
                        logo={logo}
                        redirect_uri={redirectUri}
                    />
                );
            case 7:
                return (
                    <MicrosoftLogin
                        clientId={config.MICROSOFT_ID}
                        logo={logo}
                    />
                );
            case 8:
                return (
                    <TwitterLogin
                        authCallback={(err, res) => console.log(err, res)}
                        consumerKey={config.TWITTER_ID}
                        consumerSecret={config.TWITTER_SECRET}
                    >
                        <img className="Image" src={logo} alt="logo" />
                    </TwitterLogin>
                );

            case 9:
                return (
                    <SpotifyLogin
                        clientId={config.SPOTIFY_ID}
                        redirectUri={redirectUri}
                        logo={logo}
                    />
                );

            case 10:
                return (
                    <div id="naverIdLogin">
                        <NaverLogin
                            clientId={config.NAVER_ID}
                            callbackUrl={redirectUri}
                        />
                    </div>
                );
            case 11:
                return (
                    <LineLogin
                        logo={logo}
                        clientID={config.LINE_ID}
                        redirectURI={redirectUri}
                    />
                );
            case 12:
                return <KakaoLogin logo={logo} redirectUri={redirectUri} />;

            case 13:
                return (
                    <GoogleLogin
                        clientId={config.GOOGLE_ID}
                        redirectUri={redirectUri + '/google'}
                        render={(props) => (
                            <img
                                onClick={props.onClick}
                                className="Image"
                                src={logo}
                                alt="logo"
                            />
                        )}
                        onSuccess={(data) =>
                            axios
                                .post('/api/callback/google', { data: data })
                                .then((res) => {
                                    if (res.status === 200) {
                                        console.log('success');
                                    } else {
                                        console.log('not error but problem');
                                    }
                                })
                                .catch((e) => console.log(e))
                        }
                        onFailure={(result) => console.log(result)}
                        cookiePolicy={'single_host_origin'}
                    />
                );

            default:
                return <img className="Image" src={logo} alt="logo" />;
        }
    };

    return (
        <div className="LogosWrapper">
            {logos.map((logo, i) => (
                <div key={i} style={logosStyle(i)}>
                    {Login(i, logo)}
                </div>
            ))}
        </div>
    );
}

export default Logo;
