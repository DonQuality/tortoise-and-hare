
function Animal(name, speed, focus, pBarId) {
  this.name = name;
  this.speed = speed; //distance moved per step
  this.focus = focus; //scale of 0 to 10, probability of moving in a given step
  var pBar = document.getElementById(pBarId + "bar"); //the progress bar.
  var nameForm = document.getElementById(pBarId + "name"); //the entry fields
  var speedForm = document.getElementById(pBarId + "speed");
  var focusForm = document.getElementById(pBarId + "focus");
  this.position = 0;

  this.reInitialize = function () {
    this.name = nameForm.value;
    this.speed = speedForm.value;
    this.focus = focusForm.value;
  };

  this.move = function () { //Makes a move
    if (Math.random() * 10 < this.focus) {//for focus = 8, moves 80% of the time
      this.position += speed;
    }
  };

  this.updateProgress = function (value) {
    pBar.value = value;
    pBar.getElementsByTagName('span')[0].innerHTML = value;
  };
}

function Race(animal1, animal2) {
  this.animal1 = animal1;
  this.animal2 = animal2;
  this.totalDistance = 50;
  var distForm = document.getElementById("racelength");

  this.run = function () {
    //reset everything
    this.animal1.reInitialize();
    this.animal2.reInitialize();
    this.totalDistance = distForm.value;

    this.animal1.position = 0;
    this.animal2.position = 0;
    this.animal1.updateProgress(0);
    this.animal2.updateProgress(0);

    while (true) { //when somebody wins, we return, which kills the loop.
      this.animal1.move();
      this.animal1.updateProgress(this.animal1.position / this.totalDistance * 100);
      this.animal2.move();
      this.animal2.updateProgress(this.animal2.position / this.totalDistance * 100);

      if ((animal1.position >= this.totalDistance) &&//Animal1 wins if they cross
          (animal2.position < this.totalDistance)) {  //and animal2 doesn't
        return animal1.name;
      }
      if ((animal2.position >= this.totalDistance) &&  //and vice versa
          (animal1.position < this.totalDistance)) {
        return animal2.name;
      }
      if ((animal2.position >= this.totalDistance) &&  //if it looks like a tie
          (animal1.position >= this.totalDistance)) {
        if (animal2.position > animal1.position) { //figure out who went farther
          return animal2.name;
        }
        if (animal1.position > animal2.position) {
          return animal1.name;
        }              //They both went the same distance if we get here
        return "TIE"; //This is a flag; we'll use it differently from a name

      }
    }
  };

  this.run100 = function () {
    var animal1Wins = 0;
    var animal2Wins = 0;
    var ties = 0;
    var winner;
    var i;
    for (i = 0; i < 100; i++) {
      winner = this.run();
      if (winner === this.animal1.name) {
        animal1Wins++;
      }
      if (winner === this.animal2.name) {
        animal2Wins++;
      }
      if (winner === "TIE") {
        ties++;
      }
    }
    alert(this.animal1.name + " wins " + animal1Wins + " times,\n" +
      this.animal2.name + " wins " + animal2Wins + " times,\n" +
      "and there are " + ties + " ties.");
  };
}

var rabbit = new Animal("Peter", 3, 3, 'rabb'); //relative speed is just the product, 9
var turtle = new Animal("Beth", 1, 10, 'turt');//rel. speed is 10, should always win
                                      //(except sometimes short races)
var bigRace = new Race(rabbit, turtle);

function firstButtonHit() {
  var winner = bigRace.run();
  alert("Winner of the " + bigRace.totalDistance + " m race is " +
        winner);
}

