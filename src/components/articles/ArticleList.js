import html from './article-list.html';
import './article.css';

import Template from '../Template';

export default class ArticleList {
    constructor(articleData) {
        this.dom = new Template(html).clone();
        this.articleData = articleData;
    }

    render() {
        return this.dom;
    }
}