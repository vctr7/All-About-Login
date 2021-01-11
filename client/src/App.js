import logo from './logo.png';
import './App.css';

import Logo from './component/Logo';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="App-logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="App-logos">
                    <Logo className=""></Logo>
                </div>
                <div className="App-italic" draggable={false}>
                    <i>로그인</i>
                    <br />
                    <i>ログイン</i>
                    <br />
                    <i>LOGIN</i>
                </div>
            </header>
        </div>
    );
}

export default App;
