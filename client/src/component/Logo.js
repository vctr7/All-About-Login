import React from 'react';
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
import vkontakte from '../logo/vkontakte.png';
import slack from '../logo/slack.png';
import reddit from '../logo/reddit.png';
import dropbox from '../logo/dropbox.png';
import yahoo from '../logo/yahoo.png';

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
import VkontakteLogin from './vkontakte/VkontakteLogin';
import DropboxLogin from './dropbox/DropboxLogin';
import YahooLogin from './yahoo/YahooLogin';
import RedditLogin from './reddit/RedditLogin';
import SlackLogin from './slack/SlackLogin';

import * as config from '../config';
import axios from 'axios';
import { red } from '@material-ui/core/colors';

function Logo({ userState }) {
    const logos = [
        Amazon,
        apple,
        github,
        yahoo,
        twitch,
        discord,
        facebook,
        vkontakte,
        linkedin,
        dropbox,
        microsoft,
        twitter,
        spotify,
        naver,
        line,
        kakao,
        google,
        slack,
        reddit,
    ];

    const redirectUri = 'https://localhost:3000';

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

            case 1:
                return <img className="Image" onClick={()=>alert("You need to register in Apple Developer Program")} src={logo} alt="logo"></img>;

            case 2:
                return (
                    <GithubLogin
                        logo={logo}
                        clientId={config.GITHUB_ID}
                        clientSecret={config.GITHUB_SECRET}
                        redirectUri={redirectUri}
                    />
                );
            case 3:
                return (
                    <YahooLogin
                        logo={logo}
                        clientId={config.YAHOO_ID}
                        redirectUri={redirectUri}
                    />
                );

            case 4:
                return <TwitchLogin logo={logo} clientId={config.TWITCH_ID} />;

            case 5:
                return (
                    <DiscordLogin
                        logo={logo}
                        clientId={config.DISCORD_ID}
                        clientSecret={config.DISCORD_SECRET}
                        redirectUri={redirectUri}
                    />
                );

            case 6:
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
            case 7:
                return (
                    <VkontakteLogin
                        logo={logo}
                        clientId={config.VKONTAKTE_ID}
                        redirectUri={redirectUri}
                    />
                );
            case 8:
                return (
                    <LinkedinLogin
                        clientId={config.LINKEDIN_ID}
                        logo={logo}
                        redirect_uri={redirectUri}
                    />
                );
            case 9:
                return (
                    <DropboxLogin
                        logo={logo}
                        clientId={config.DROPBOX_ID}
                        redirectUri={redirectUri}
                    />
                );
            case 10:
                return (
                    <MicrosoftLogin
                        clientId={config.MICROSOFT_ID}
                        logo={logo}
                    />
                );
            case 11:
                return (
                    <TwitterLogin
                        authCallback={(err, res) => console.log(err, res)}
                        consumerKey={config.TWITTER_ID}
                        consumerSecret={config.TWITTER_SECRET}
                        callbackUrl={redirectUri+'/twitter'}
                    >
                        <img className="Image" src={logo} alt="logo" />
                    </TwitterLogin>
                );

            case 12:
                return (
                    <SpotifyLogin
                        clientId={config.SPOTIFY_ID}
                        redirectUri={redirectUri}
                        logo={logo}
                    />
                );

            case 13:
                return (
                    <div id="naverIdLogin">
                        <NaverLogin
                            clientId={config.NAVER_ID}
                            callbackUrl={redirectUri}
                        />
                    </div>
                );
            case 14:
                return (
                    <LineLogin
                        logo={logo}
                        clientID={config.LINE_ID}
                        redirectURI={redirectUri}
                    />
                );
            case 15:
                return <KakaoLogin logo={logo} redirectUri={redirectUri} />;

            case 16:
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

            case 17:
                return (
                    <SlackLogin
                        logo={logo}
                        clientId={config.SLACK_ID}
                        redirectUri={redirectUri}
                    />
                );
            case 18:
                return (
                    <RedditLogin
                        logo={logo}
                        clientId={config.REDDIT_ID}
                        redirectUri={redirectUri}
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
