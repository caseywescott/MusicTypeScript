// Mersenne Twister Algorithm
function mersenneTwister(seed: number): number {
  // Initialize the array with a seed
  let mt = [seed];

  // Initialize some other variables
  const N = 624;
  const M = 397;
  const MATRIX_A = 0x9908b0df; /* constant vector a */
  const UPPER_MASK = 0x80000000; /* most significant w-r bits */
  const LOWER_MASK = 0x7fffffff; /* least significant r bits */

  // Initialize the array with values from the seed
  for (let i = 1; i < N; i++) {
    let s = mt[i - 1] ^ (mt[i - 1] >>> 30);

    mt[i] =
      ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
      (s & 0x0000ffff) * 1812433253 +
      i;

    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */

    mt[i] >>>= 0; // for WORDSIZE > 32 machines
  }

  let index = N;

  function generateNumbers() {
    if (index >= N) {
      // generate N words at one time

      for (let k = 0; k < N - M; k++) {
        let y = (mt[k] & UPPER_MASK) | (mt[k + 1] & LOWER_MASK);

        mt[k] = mt[k + M] ^ (y >>> 1) ^ (y & 0x1 ? MATRIX_A : 0);
      }

      for (let k = N - M; k < N - 1; k++) {
        let y = (mt[k] & UPPER_MASK) | (mt[k + 1] & LOWER_MASK);

        mt[k] = mt[k + (M - N)] ^ (y >>> 1) ^ (y & 0x1 ? MATRIX_A : 0);
      }

      let y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);

      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ (y & 0x1 ? MATRIX_A : 0);
      index = 0;
    }
    return mt[index++];
  }
  return generateNumbers();
}
console.log(mersenneTwister(3475));
