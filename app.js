var numberRow = 1;
var numberColumn = 0;
var correctLetters = 0;
var isLoading = false;
var WORD = 'cortos'
var WORD_ARRAY = WORD.split('');

function validateGoodLetters() {
  for (let i = 1; i <= 6; i++) {
    let parrafo = document.getElementById(`${numberColumn}${i}`);
    let letra = WORD_ARRAY[i - 1];
    if (parrafo.innerHTML === letra.toUpperCase()) {

      let elemento = document.getElementById(`box${numberColumn}${i}`);
      elemento.className += " correct";
      correctLetters++;
      WORD_ARRAY[i - 1] = ''
    }
  }
}

function validateWord() {
  for (let i = 1; i <= 6; i++) {
    let letter = document.getElementById(`${numberColumn}${i}`);

    if (WORD_ARRAY.find(element => element === letter.innerHTML.toLowerCase()) && WORD_ARRAY[i - 1] !== '') {
      let elemento = document.getElementById(`box${numberColumn}${i}`);
      elemento.className += " cerca"
    } else if (WORD_ARRAY[i - 1] !== '') {
      let elemento = document.getElementById(`box${numberColumn}${i}`);
      elemento.className += " incorrect";
    }
  }

}

async function getWord() {
  fetch('https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=6')
    .then(response => response.json())
    .then(data => {
      WORD = data.body.Word;
      console.log(data.body.Word);
      WORD_ARRAY = WORD.split('');
      isLoading = false;
    })
}

async function verifyWorkd(wordSearch) {
  isLoading = true;
  fetch(`https://palabras-aleatorias-public-api.herokuapp.com/palabras-aleatorias?Word=${wordSearch}`)
    .then(response => response.json())
    .then(data => {
      isLoading = false;
      if (data.body[0].Word) {
        numberRow = 1;
        validateGoodLetters();
        validateWord();
        numberColumn++;
        correctLetters = 0
        WORD_ARRAY = WORD.split('');
      }
    }).catch(e => {
      let div = document.getElementById('alert');
      div.classList.remove('fadeAlert');
      ;
    })
}



document.addEventListener('keydown', (event) => {

  var keyValue = event.key;
  if (event.key === 'Enter' && numberRow === 7 && isLoading === false) {
    let wordSearch = '';
    for (let i = 1; i <= 6; i++) {
      let letter = document.getElementById(`${numberColumn}${i}`).innerHTML;
      wordSearch = wordSearch + letter

    }
    this.verifyWorkd(wordSearch.toLocaleLowerCase())
  }


  if (allowOnlyAlphabets(event) && numberRow <= 7) {
    document.getElementById(`${numberColumn}${numberRow}`).innerHTML = keyValue.toUpperCase();
    numberRow++;
  }

  if (event.key === 'Backspace' && numberRow >= 1) {
    document.getElementById(`${numberColumn}${numberRow - 1}`).innerHTML = '';
    numberRow--;
  }


  if (numberRow > 7) {
    numberRow = 7;
  }
  if (numberRow === 0) {
    numberRow = 1;
  }

}, false);

function allowOnlyAlphabets(event) {
  var charCode = event.keyCode;
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
    return true;
  else
    return false;
}

const alertTrigger = document.getElementById('btnAlert')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    let elemento = document.getElementById(`alert`);
    elemento.className += " fadeAlert";
  })
}

//getWord();