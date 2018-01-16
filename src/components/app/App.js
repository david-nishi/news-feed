import html from './app.html';
import './app.css';

import Template from '../Template';
import Header from '../header/Header';
import ArticleList from '../articles/ArticleList';

import { getTopNews, searchNews } from '../../services/newsApi.js';
import { ARTICLES_PER_PAGE } from '../../services/constants';


export default class App {
    constructor() { 
        this.dom = new Template(html).clone();
    }

    async getInitContent() {
        const res = await getTopNews('general');
        if(res.status === 'ok') this.fillArticles(res.articles);
        else console.log(res.message);
    }

    async handleSearch(searchParams) {
        const res = await searchNews(searchParams);
        console.log(res)
        if(res.status === 'ok') {
            if(res.totalResults > 0){
                this.updatePageSelectEl(res.totalResults);
                this.fillArticles(res.articles);
            }
            else
                console.log('no results found');    // TODO: render message in dom
        }
        else if(res.status === 'error')
            console.log(res.message);   // TODO: render error message in dom
    }

    fillArticles(articles) {
        const articlesSection = this.main.querySelector('#articles');
        if(articlesSection) this.main.removeChild(articlesSection);
        this.main.appendChild(new ArticleList(articles).render())
    }

    updatePageSelectEl(totalResults) {
        const currentPages = parseInt(this.pageSelectEl.getAttribute('data-max'));
        let numPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);
        if(numPages > 50) numPages = 50;

        if(currentPages < numPages) {
            for(let i = currentPages + 1; i <= numPages; i++) {
                console.log(i)
                let optEl = document.createElement('option');
                optEl.setAttribute('value', i);
                optEl.innerText = i;
                this.pageSelectEl.appendChild(optEl);
                if(i === numPages) this.pageSelectEl.setAttribute('data-max', i);
            }
        }
        else {
            while(parseInt(this.pageSelectEl.lastChild.value) > numPages) {
                console.log(this.pageSelectEl.lastChild.value)
                this.pageSelectEl.removeChild(this.pageSelectEl.lastChild);
            }
        }
    }
    
    render() {
        // this.getInitContent();
        const header = new Header(
            searchParams => this.handleSearch(searchParams)
        );
        
        this.dom.querySelector('header').appendChild(header.render());
        this.main = this.dom.getElementById('main');
        this.pageSelectEl = this.dom.getElementById('page-select')

        return this.dom;
    }
}