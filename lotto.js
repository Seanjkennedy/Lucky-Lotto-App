
//  lotto game - [balls in main pot, number of picks],[balls in bonus pot, number of picks]
var lottoGames = {
    "UKLotto": [[59,6],[null,null]],
    "EuroLotto": [[50,6],[12,2]],
    "IrishLotto": [[46,6],[null,null]],
    "USLotto": [[70,5],[25,1]]
}

// populate arrays
var getMainNumbers = (lottoGames) => {

    lottoGames = lottoGames + 1;
    return [...Array(lottoGames).keys()].slice(1);
    }

// retrieves value from selected radio button
var getGameType = () => {

    var games = document.getElementsByName("gameChoice");
    var selectedValue;
    for (game of games) {
        if (game.checked) {
            selectedValue = game.value;
            break;
        }
    }
    return selectedValue
}

// onclick, initiate app logic
var submitLottoForm = () => {

    getGame = getGameType();

    var displayText = generateText()
 
    updateDisplay(displayText)

    }


// Loops over getRandomNumber function and returns the output text for the app formatted in html
var generateText = () => {

    var mainTextHeader = "<h1>Your Main Numbers are:</h1>";
    var mainTextBody = "";
    var bonusTextHeader = "";
    var bonusTextBody = "";

    for (var i = 0; i < numberOfGames(); i++) {
      
        var main = getMainNumbers(lottoGames[getGame][0][0]);
        var bonus = getMainNumbers(lottoGames[getGame][1][0]);

        var mainPicks = getRandomNumber(main, lottoGames[getGame][0][1]);
        var bonusPicks = getRandomNumber(bonus, lottoGames[getGame][1][1]);

        mainTextBody += `<br> ${mainPicks.join(" ")}`
    
        if (bonusPicks.length > 0){
            bonusTextHeader = "<h1>Your Bonus Numbers are:</h1>";
            bonusTextBody += `<br> ${bonusPicks.join(" ")}`;
            }
        }
        numberOfGames();
        return  `${mainTextHeader}${mainTextBody}<br>${bonusTextHeader}${bonusTextBody}`
}


//  takes an array for available numbers, and the number of balls to be selected from array.  returns as a string
var getRandomNumber = (numberArray, balls) => {
    
    copy_numberArray = numberArray;
    var numbers = [];

    for ( var i = 0; i < balls; i++) {
    
        var randomElement = copy_numberArray[Math.floor(Math.random() * copy_numberArray.length)];
    
        numbers.push(randomElement)
    
        // removes 'ball' from the pot
        var removeElement = function() {

            index = copy_numberArray.indexOf(randomElement); 
    
            if (index !== -1) {
                copy_numberArray.splice(index, 1);
                }
            }
        removeElement()
        }       
        return numbers.sort((a,b) => a - b);
    }


var updateDisplay = (numbers) => {

    var display = document.getElementById("numbers");
    display.innerHTML = numbers;
    } 


// get the number of games selected from the drop down menu 
var numberOfGames = () => {

    var getNumberOfGames = document.getElementById("numberOfGames");
    return getNumberOfGames.value;
    }
