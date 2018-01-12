// import './reset.css'
import './main.css'

import Header from './components/header/Header';
import App from './components/app/App';


const root = document.getElementById('root');
const header = new Header();
const app = new App();

root.appendChild(header.render());
root.appendChild(app.render());