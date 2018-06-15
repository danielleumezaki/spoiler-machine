const cheerio = require('cheerio');
const request = require('request');
const readlineSync = require('readline-sync');
let url = 'https://www.google.ca/search?';

let movieName = readlineSync.question('Welcome to spoiler movie, please enter the name of the movie.');
let movieTime = readlineSync.questionInt('Plese, enter how many seconds do you want to wait before spolling?');
if (movieName === '' || movieTime === 0) {
    console.log('Error, name or number invalid');
    return;
} else {
    console.log(`**spoiler warning** about to spoil the movie ${movieName} in ${movieTime} seconds`);
    console.log("While you wait you can see some news about this movie");
    showNameSpoller();
}

/*Function to set the time to show the spoiler and show the movie spoiler*/
function showNameSpoller() {
    movieTime = movieTime * 1000;
    setTimeout(function () {
        let url2 = `https://api.themoviedb.org/3/search/movie?api_key=9acd257183931f2a1400fb3f205de85a&query=${movieName}`
        request(url2, function (error, response, body) {
            if (error) {
                console.log("This is not a movie name or this movie doesn't exist");
                return;
            } else {
                let objectText = JSON.parse(body);
                console.log(objectText.results[0].overview);
            }
        })
    }, movieTime)
}


/*Request Movie Google*/

url = `https://www.google.ca/search?q=film+${movieName}`
request(url, function (error, response, body) {
    if (error) {
        console.log(error);
    } else {
        const $ = cheerio.load(body);
        const titleArray = [];
        const title = $("h3").each(function (i, elem) {
            titleArray[i] = $(this).text();
            console.log(titleArray[i]);
        })
    }
})







