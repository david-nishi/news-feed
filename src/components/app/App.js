import html from './app.html';
import './app.css';

import Template from '../Template';
import Header from '../header/Header';
import ArticleList from '../articles/ArticleList';

import { getTopNews, searchNews } from '../../services/newsApi.js';


export default class App {
    constructor() { 
        this.dom = new Template(html).clone();
    }

    async handleSearch(search) {
        const res = await searchNews(search);
        console.log(res)
        if(res.status === 'ok') {
            if(res.totalResults > 0)
                this.fillArticles(res.articles);
            else
                console.log('no results found');    // TODO: render message in dom
        }
        else if(res.status === 'error')
            console.log(res.message);   // TODO: render error message in dom
    }

    fillArticles(articles) {
        this.articles.innerHTML = '';
        this.articles.appendChild(new ArticleList(articles).render())
    }
    
    render() {
        const header = new Header(search => this.handleSearch(search));
        this.dom.querySelector('header').appendChild(header.render());
        this.articles = this.dom.getElementById('articles');
        return this.dom;
    }
}