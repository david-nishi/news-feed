import html from './app.html';
import './app.css';

import Template from '../Template';
import Header from '../header/Header';


export default class App {
    constructor() { 
        this.dom = new Template(html).clone();
    }

    handleSearch(search) {
        console.log(search);
    }
    
    render() {
        const header = new Header(search => this.handleSearch(search));
        this.dom.querySelector('header').appendChild(header.render());
        return this.dom;
    }
}