import  words  from './data.js';
const container = document.querySelector('.content');
const wordText = document.querySelector('.word'),
wordHint =  document.querySelector('.hint span'),
timeText = document.querySelector('.time span'),
refreshBtn = document.querySelector('.refresh-word'),
checkBtn = document.querySelector('.check-word'),
inputField = document.querySelector('input'),
scoreElement = document.querySelector('.score span');

let correctword, timer;
let score = 0;
const playGame = () => {
    if(playGame.done) return;
    refreshBtn.innerHTML = "Refresh Word";
    scoreElement.innerHTML = 0;
    playGame.done = true;
};


const initTimer = (maxTimer) => {
    clearInterval(timer);
    
    timer = setInterval(() => {
        if(maxTimer > 0) {
            maxTimer--; // decrement maxTimer by -1
            return timeText.innerHTML = maxTimer;
        }
        clearInterval(timer);
        alert(` waktu habis, jawabanya adalah ${correctword.toUpperCase()}`);
        window.location.reload();
    }, 1000)
}

const initGame = () => {
    initTimer(31);
    let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
    // console.log(randomObj);
    let wordArray = randomObj.word.split(""); // splitting each letter of random word
    console.log(wordArray);

    for (let i = wordArray.length - 1; i > 0; i--) {
        // console.log('i = ' + i);
        let j = Math.floor(Math.random() * i + 1);
        // console.log('MathRandom = ' + j);
        let temp = wordArray[i];
        // console.log(temp);
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
        // shuffling and swiping wordArray letter randomly
    }

    wordText.innerHTML = wordArray.join("") // passting suffled word as word text
    wordHint.innerHTML = randomObj.hint; // passing random object hint as hint text
    correctword = randomObj.word.toLowerCase(); // passing random word to correctWord
    inputField.value = ''; // making input field empty
    inputField.setAttribute('maxlength', correctword.length) // tidak ada spasi setelah huruf terakhir
    // console.log(wordArray, randomObj.word);
}
 
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert('yaa diisi lah blok')
    if(userWord === correctword) {
        alert(`Congratss!, ${userWord.toUpperCase()} jawabannya bung!`);
        inputField.value = '';
        score = score + 5;
        initGame();
    }else {
        alert(` Opss!, ${userWord} salah`)
        if(score === 0) return score = 0;
        score = score - 2;
    }
    scoreElement.innerHTML = score;
};

refreshBtn.addEventListener('click', () => {
    playGame();
    initGame();
});

checkBtn.addEventListener('click', checkWord);

window.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        checkWord();
    }
})