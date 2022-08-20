var numberFila= 1;
var numberColumna =0;

async function getWord(){
  fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
  .then(response => response.json())
  .then(data => {console.log (data)})
}

document.addEventListener('keydown', (event) => {
  
  var keyValue = event.key;

  if(allowOnlyAlphabets(event) && numberFila <= 6){    
    document.getElementById(`${numberColumna}${numberFila}`).innerHTML=keyValue.toUpperCase();
    numberFila++;
  }

  if(event.key === 'Backspace' && numberFila >= 1){    
    console.log(numberFila)
    document.getElementById(`${numberColumna}${numberFila}`).innerHTML='';
    numberFila--;
  }

  if(event.key === 'Enter'){
    numberFila= 1;
    numberColumna++;
  }

  if(numberFila>6){
    numberFila=6;
  }
  if(numberFila===0){
    numberFila=1;
  }
  
}, false);

function allowOnlyAlphabets(event) {
  var charCode = event.keyCode;
 
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
    return true;
  else
    return false;
}

getWord();