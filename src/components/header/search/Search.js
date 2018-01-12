import html from './search.html';
import './search.css';

import Template from '../../Template';


export default class Search {
    constructor() {
        this.dom = new Template(html).clone();
    }

    render() {
        return this.dom;
    }
}