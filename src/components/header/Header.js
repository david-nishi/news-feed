import html from './header.html';
import './header.css';

import Template from '../Template';
import Search from './search/Search';


export default class Header {
    constructor() {
        this.dom = new Template(html).clone();
    }

    render() {
        this.dom.appendChild(new Search().render());

        return this.dom;
    }
}