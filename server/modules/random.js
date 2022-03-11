// let rdmNum = randomNumber(1, 25);

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  };

  module.exports = {
    randomNumber: randomNumber,
  };