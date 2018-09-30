import { ARTICLES_PER_PAGE } from './constants';
import 'dotenv/config';

const apiKey = process.env.API_KEY;
const pathTopHeadlines = process.env.TOP_HEADLINES_URL;
const pathEverything = process.env.API_URL;


export async function getTopNews(category = 'general') {
    const url = `${pathTopHeadlines}?` +
        'country=us&' +
        `category=${category}&` + 
        `apikey=${apiKey}`;
    
    const response = await fetch(url);
    return response.json();
}

export async function searchNews({ searchTerms, page = 1, todayOnly = false, sortBy = 'popularity' }) {
    const today = new Date();
    const url = `${pathEverything}?` +
        `q=${searchTerms}&` +
        'language=en&' +
        `pageSize=${ARTICLES_PER_PAGE}&` +
        `page=${page}&` +
        `sortBy=${sortBy}&` +
        (todayOnly ? 
            `from=${today.getYear() + 1900}-${today.getMonth() + 1}-${today.getDate()}&` :
            '') +
        `apikey=${apiKey}`;

    const response = await fetch(url);
    return response.json();
}