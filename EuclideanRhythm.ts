/*
  Euclidean Algorithm for generating rhythmic sequences in TypeScript
  implementation of "The Euclidean Algorithm Generates Traditional Musical Rhythms"
  http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf
 */

//n - pulses, k rests

function generateBinarySequence(n: number, k: number): number[][] {
  let result = "";
  let rhythm = [];

  for (let i = 0; i < n; i++) {
    result += "1";
    rhythm.push([1]);
  }

  for (let j = 0; j < k; j++) {
    result += "0";
    rhythm.push([0]);
  }

  return rhythm;
}

// Helper function for array concatenation

function appendNTimes(arr: any[][], n: number): any[][] {
  let result = arr;

  for (let i = 0; i < n; i++) {
    const lastArray = result.pop();
    if (lastArray) {
      result[i].push(...lastArray);
    }
  }

  return result;
}

function euclideanAlgorithm(a: number, b: number, c: any[][]): any {
  if (b === 0) {
    return c.flat();
  }
  return euclideanAlgorithm(b, a % b, appendNTimes(c, b));
}

function euclideanRhythm(n: number, k: number): any[] {
  var binary_seq = generateBinarySequence(n, k);
  var euclidean = euclideanAlgorithm(k, n, binary_seq);
  return euclidean;
}

function euclideanRhythmSequence(pulses: number, beats: number): any[] {
  var num_rests = beats - pulses;
  var binary_seq = generateBinarySequence(pulses, num_rests);
  var euclidean = euclideanAlgorithm(num_rests, pulses, binary_seq);
  return euclidean;
}

/*
console.log(euclideanRhythm(5,8))
console.log(generateBinarySequence(5,8))
*/

console.log(euclideanRhythm(5, 8));
