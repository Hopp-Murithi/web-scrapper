import axios from "axios";
import * as cheerio  from "cheerio";
import * as fs from 'fs/promises';

const pageUrl = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3';


const scrapeData = async ()=> {
    try{
        const {data} = await axios.get(pageUrl);

        const $ = cheerio.load(data);
        const listItems = $('.plainlist ul li');

const  countries =[];
listItems.each((idx,el) => {
    const country ={name:'',abbreviation:''}

    country.name = $(el).children('a').text();
    country.abbreviation = $(el).children('span').text();

    countries.push(country);
})
console.log(countries);

fs.writeFile('countriesData.json',JSON.stringify(countries, null , 2),(err)=>{
    if(err) {
        console.log (err.message)
        return
    } else {
        console.log('Data sucessfully scrapped to file')
    }
})
    }
   catch(err){
    console.log(err)
   }
}
scrapeData();