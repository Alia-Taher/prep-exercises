# Experiment

``` javascript

"use strict";

function runExperiment(sampleSize) {
  const valueCounts = [0, 0, 0, 0, 0, 0];

  let randomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  for (let i = 0; i < sampleSize; i++) {
    let number = randomNumber();

    if (number == 1) {
      valueCounts[0]++;
    }
    if (number == 2) {
      valueCounts[1]++;
    }
    if (number == 3) {
      valueCounts[2]++;
    }
    if (number == 4) {
      valueCounts[3]++;
    }
    if (number == 5) {
      valueCounts[4]++;
    }
    if (number == 6) {
      valueCounts[5]++;
    }
  };

  const results = [];

  for (const count of valueCounts) {
    const percentage = (count / sampleSize) * 100;
    const percentageInDecimals = percentage.toFixed(2);
    results.push(percentageInDecimals);
  };

  return results;
};

function main() {
  const sampleSizes = [100, 1000, 1000000];
  const output = [];
  let data;
  for (const sample of sampleSizes) {
    data = runExperiment(sample);
    output.push(data);
  }
  console.log(output[0], sampleSizes[0]);
  console.log(output[1], sampleSizes[1]);
  console.log(output[2], sampleSizes[2]);

}

main();

```