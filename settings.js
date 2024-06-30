const dictionary = ["Penetrated", "Submerged", "Adaptation", "Nutrient", "Spongy", "Water Lily", "Lotus", "Pitcher Plant", "Trigger hair", "Chlorophyll", "Mycoheterotropic", "Rafflesia", "Decaying", "Bleeding", "Diarrhea", "Brinjal", "Secondary", "Tertiary", "Maturation", "Elongation", "Cell Division", "Additional", "Rhizobium", "Nodule", "Manure", "Atmosphere"];

var lettersCount = 0;
var index = 0;
var len = 0;
var inputElem;
var word;
var wordArray;
var randomValue;
var blankOnIndex;
var timesClickedWhileCorrect = 0; //Prevents multiple cartoon altering from a single correct answer by clicking the check button multiple times.

var container = document.getElementById('questionContainer');

function marginLeftOfFirstInputBox(n) {
  return (1090.2 - 65 * n)/2;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createQuestion(){
  //Remove pre-existing inputs before creating new ones.
  for(var i = 1; i <= len; i++){
    document.getElementById(`letter${i}`).remove();
  }

  index = getRandomInt(26);
  word = dictionary[index];
  len = word.length;

  wordArray = word.split("");

  randomValue = getRandomInt(len-1);

  for(var i = 0; i < len; i++){
    inputElem = document.createElement("input");
    inputElem.id = "letter" + (i+1);
    inputElem.maxLength = 1;

    if(i != randomValue){
      inputElem.value = wordArray[i];
      inputElem.disabled = "true";
    }
    else{
      //Store the index of blank in question
      blankOnIndex = i;
    }
    container.appendChild(inputElem);
  }

  document.getElementById("letter1").style.marginLeft = marginLeftOfFirstInputBox(len);
  document.getElementById(`letter${blankOnIndex+1}`).focus();

  timesClickedWhileCorrect = 0; // Resetting the count
}
createQuestion();

function checkCorrectness(){

  if(document.getElementById(`letter${blankOnIndex+1}`).value == wordArray[blankOnIndex]){  //If correct:
    //Music
    document.getElementById("appalauseSoundEffect").play();
    document.getElementById("GIF").src="Images/a.gif";

    //GIF
    document.getElementById("GIF").style.display = "block";
    sleep(6000).then(() => { document.getElementById("GIF").style.display = "none"; });

    //Image
    if(timesClickedWhileCorrect < 1){
      document.getElementById("cartoon").src=`Images/${getRandomInt(15)+1}.png`; //To not get Images/0.png
    }
    document.getElementById("cartoon").style.display = "block";
    timesClickedWhileCorrect++;
  }
  else{
    //Music
    document.getElementById("GIF").src="Images/b.gif";
    document.getElementById("laughingSoundEffect").play();

    //GIF
    document.getElementById("GIF").style.display = "block";
    sleep(2000).then(() => { document.getElementById("GIF").style.display = "none"; });
  }

  document.getElementById(`letter${blankOnIndex+1}`).focus();
}
