import html from './header.html';
import './header.css';

import Template from '../Template';
import Search from './search/Search';


export default class Header {
    constructor(onSearch) {
        this.dom = new Template(html).clone();
        this.onSearch = onSearch;
    }

    handleSearch() {
        this.onSearch(this.searchInput.value);
    }

    render() {
        const searchDom = new Search().render();
        this.searchInput = searchDom.querySelector('input');

        this.searchInput.addEventListener('keydown', e => e.key === 'Enter' && this.handleSearch())
        searchDom.querySelector('button').addEventListener('click', () => this.handleSearch())

        this.dom.getElementById('search-bar').appendChild(searchDom);

        return this.dom;
    }
}