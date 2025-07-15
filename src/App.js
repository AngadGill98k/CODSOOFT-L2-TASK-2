import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Craete from './components/create/craete';
import Take from './components/take/take.';
import Quiz from './components/quiz/quiz';
import Summmary from './components/summary/summmary';
const socket = new WebSocket("wss://zxfxws66-3000.inc1.devtunnels.ms/ws");

function App() {
  return (
    <>
    <Home/>
    </>
  );
}

export default App;
