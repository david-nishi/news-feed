import html from './app.html';
import './app.css';
import Template from '../Template';

export default class App {
    constructor() {
        this.dom = new Template(html).clone();
        console.log()
    }

    render() {
        return this.dom;
    }
}