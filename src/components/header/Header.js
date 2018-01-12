import html from './header.html';
import './header.css';
import Template from '../Template';

export default class Header {
    constructor() {
        this.dom = new Template(html).clone();
    }

    render() {
        return this.dom;
    }
}