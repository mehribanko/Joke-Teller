const button=document.getElementById('button');
const audioElement=document.getElementById('audio');


// disable/enable  button

function toggleButton(){
    button.disabled=!button.disabled;
}


// passing joke api to speech api

function tellMe(joke){
    VoiceRSS.speech({
       key: '0e170117fac7476ea13f6c9f51830f03',
       src: joke,
       hl: 'en-us',
       v: 'Linda',
       r: 0, 
       c: 'mp3',
       f: '44khz_16bit_stereo',
       ssml: false
       });
}


// Get Jokes from API
async function getJokes(){
    const apiUrl='https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    let joke='';

    try{
        const response=await fetch(apiUrl);
        const data=await response.json();
        if(data.setup){
            // template string
            joke=`${data.setup}...${data.delivery}`;
        }else{
            joke=data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch(error){
        // catch errors
        console.log('oops',error);
    }
} 


// adding event listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);