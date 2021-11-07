const gameContainer = document.getElementById('game');

// initial card state, using null puts object values to nothing. We need to set two card objects to null so they do not have properties on them because we need to set a couple of properties as we work through UI from the user.
let card1 = null;
let card2 = null;
// We need to track card flips
let cardsFlipped = 0;
// We need to be able to stop the time out
let noClicking = false;

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Set all of the cards as not clicked to start
  if (noClicking) return;
  // Now all cards are set to false to indicate they are not clicked and we can changed track their UI interaction.

  // Here we need to check if we have assigned an identifier telling us that we give it a flipped class which is done later in the program. We are only trying to get cards state in regards to the conditions we need to compare later in the program to decide on our next actions based on user UI.
  if (event.target.classList.contains('flipped')) return;

  // Now we begin to track user behavior
  // We start by setting the current user click on the div object to the variable currentCard. We need this so we can assign the currentCard properties to card 1 or card 2 later for comparison of winning or losing game conditions which is why we have it as a let variable also.
  let currentCard = event.target;

  // Now we are going to set the color from the array of colors starting at the beginning of the array, loop thorough the array, and set the currentCard to the matching string classList on the div object so we can compare this to the next users click on the next card.
  currentCard.style.backgroundColor = currentCard.classList[0];

  // Now we need to loop back to the original setup of card 1 and card 2 to make sure the have not been given object properties and are still null.
  if (!card1 || !card2) {
    // We are making sure we have not set card 1 or card 2 from the initial null value and changing the currentCard value
    currentCard.classList.add('flipped');
    // Now we are setting the adding the property of flipped to the card the user just clicked.
    card1 = card1 || currentCard;
    // Now we set the value of card 1 to card1 or the currentCard depending if this is our first click or our second click.
    card2 = currentCard === card1 ? null : currentCard;
    // Here we deepen the logic and make some choices in one line. First we set the click to card 2 because we have clicked another card. Now we check if card one has a added object value or if it is still set to null. At this point card 1 and card 2 are clicked so we can set some more conditions
  }

  // Now we begin to set the noClicking property from 0 to a value because we clicked some cards.
  if (card1 && card2) {
    // If we have clicked two different cards then we can set noClicking to true because we know two cards were clicked and have added values.
    noClicking = true;

    // No we need to store the color and assign it to the cards we have clicked so we can compare those values. Card 1 is assigned a color value.
    let gif1 = card1.className;

    // Card 2 is assigned a value.
    let gif2 = card2.className;

    // Now lets compare colors between the cards and see if they share the same color on the className
    if (gif1 === gif2) {
      // We increment our counter of cards flipped to two after checking all previous conditions and verifing two cards have the required classes added.
      cardsFlipped += 2;

      // Regardless of match or not we need to remove the event listener so we can add it back to the next user click handle during their next guess.
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);

      // Now we need to reset all our cards conditions to zero so we can work through the program for a run of two new cards.

      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      // If we have not qualified all required conditions from above we need to set the backgroundColors to not be visible so the user can guess again with a set timeout and put the div objects back to the shuffled card states.
      setTimeout(function () {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  // you can use event.target to see which element was clicked
  console.log('you just clicked', event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
