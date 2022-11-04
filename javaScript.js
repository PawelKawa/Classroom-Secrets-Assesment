const form = document.getElementById('form');
const table = document.getElementById('mainTable');

let getMean = (arr) => {
  let sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

let getMedian = (arr) => {
  let sortedNumbers = arr.sort((a, b) => a - b);
  let length = sortedNumbers.length;
  let middle = Math.floor(length / 2);
  return length % 2 === 0 ? (arr[middle - 1] + arr[middle]) / 2 : arr[middle];
};

let getMode = (arr) => {
  const frequencyTable = {};
  arr.forEach((e) => (frequencyTable[e] = frequencyTable[e] + 1 || 1));

  let result = [];
  let mostFrequency = 0;

  for (let key in frequencyTable) {
    if (frequencyTable[key] > mostFrequency) {
      mostFrequency = frequencyTable[key];
      result = [key];
    } else if (frequencyTable[key] === mostFrequency) {
      result.push(key);
    }

    if (result.length === Object.keys(frequencyTable).length) {
      result = ['None'];
    }
  }
  return result;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const option = document.querySelector('input[name="option"]:checked').value;
  const input = document.getElementById('input').value;

  let array = [];

  if (option === 'coma-space') {
    array = input.split(', ');
  } else if (option === 'space') {
    array = input.split(' ');
  } else {
    array = input.split(',');
  }

  let validated = array.filter(Number);

  let stringsToNumbers = validated.map((num) => parseFloat(num, 10));

  let mean = getMean(stringsToNumbers);

  let median = getMedian(stringsToNumbers);

  let mode = getMode(stringsToNumbers);

  let rows = [];

  rows += `<tr><td>${validated}</td><td>${mean}</td><td>${median}</td><td>${mode}</td></tr>`;
  table.innerHTML += rows;
});
