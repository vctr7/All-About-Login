import logo from './logo.png';
import './App.css';

import Logo from './component/Logo';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core/';
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSingIn] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordChecker, setPasswordChecker] = useState(false);
    // const emailCheck = false;
    useEffect(() => {
        if (password === passwordCheck) setPasswordChecker(true);
        else setPasswordChecker(false);
    }, [passwordCheck]);
    const signUp = (e) => {
        e.preventDefault();

        //
        setOpen(false);
        setPasswordChecker(false);
        setPassword('');
        setPasswordCheck('');
        setId('');
        setOpenSingIn(false);
    };

    const signIn = (e) => {
        e.preventDefault();

        //

        setPassword('');
        setId('');
        setOpenSingIn(false);
    };
    return (
        <div className="App">
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setPasswordChecker(false);
                    setId('');
                    setPassword('');
                    setPasswordCheck('');
                    setUsername('');
                    setEmail('');
                    setOpenSingIn(false);
                }}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form>
                        <center className="SignUp">
                            {/* <img
                                src={logoUrl}
                                className="Header-logo"
                                draggable="false"
                                alt=""
                            /> */}
                            회원가입 / サインアップ / SIGN UP
                            <Input
                                type="text"
                                placeholder="ID"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="PASSWORD-check"
                                value={passwordCheck}
                                onChange={(e) => {
                                    setPasswordCheck(e.target.value);
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="NAME"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="E-MAIL"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                            <div>
                                {passwordCheck ? (
                                    <>
                                        {passwordChecker
                                            ? '✅'
                                            : '비밀번호 틀림'}
                                    </>
                                ) : null}
                            </div>

                            <Button type="submit" onClick={signUp}>
                                Sign Up
                            </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => {
                    setPassword('');
                    setId('');
                    setOpenSingIn(false);
                }}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form>
                        <center className="SignIn">
                            {/* <img
                                src={logoUrl}
                                className="Header-logo"
                                draggable="false"
                                alt=""
                            /> */}
                            로그인 / サインイン / SIGN IN
                            <Input
                                type="text"
                                placeholder="ID"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Button type="submit" onClick={signIn}>
                                Log In
                            </Button>
                            <Button
                                type="submit"
                                onClick={() => {
                                    setOpen(true);
                                    setOpenSingIn(false);
                                }}
                            >
                                Sign Up
                            </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <header className="App-header">
                <div className="App-logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="App-logos">
                    <Logo className=""></Logo>
                </div>
                <div className="App-italic" onClick={() => setOpenSingIn(true)}>
                    
                    <i>ローカル アカウント</i>
                    <br />
                    <i>로컬 계정</i>
                   
                    <br />
                    <i>LOCAL ACCOUNT</i>
                </div>
            </header>
        </div>
    );
}

export default App;