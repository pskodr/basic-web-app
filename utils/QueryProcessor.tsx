export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Rohan";
  }

  if (query.toLowerCase().includes("andrew id")){
    return "pchivatx";
  }

  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s]+)/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map((s) => parseInt(s.trim(), 10));
    const max = Math.max(...numbers);
    return String(max);
  }

  const squareAndCubeMatch = query.match(/which of the following numbers is both a square and a cube:\s*([\d,\s]+)/i);
  if (squareAndCubeMatch) {
    const numbers = squareAndCubeMatch[1].split(",").map((s) => parseInt(s.trim(), 10));
    const sixthPowers = numbers
      .filter((n) => {
        const r = Math.round(Math.pow(n, 1 / 6));
        return r * r * r * r * r * r === n;
      })
      .sort((a, b) => a - b);
    return sixthPowers.length > 0 ? sixthPowers.join(", ") : "";
  }

  const mixedMatch = query.match(/what is (\d+) minus (\d+) multiplied by (\d+) to the power of (\d+)/i);
  if (mixedMatch) {
    const a = parseInt(mixedMatch[1], 10);
    const b = parseInt(mixedMatch[2], 10);
    const c = parseInt(mixedMatch[3], 10);
    const exp = parseInt(mixedMatch[4], 10);
    const pow = Math.pow(c, exp);
    return String(a - b * pow);
  }

  const powerMatch = query.match(/what is (\d+) to the power of (\d+)/i);
  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    let exp = BigInt(powerMatch[2]);
    let result = BigInt(1);
    while (exp > BigInt(0)) {
      result *= base;
      exp -= BigInt(1);
    }
    return String(result);
  }

  const multPlusMinusMatch = query.match(/what is (.+?)\s*\?\s*$/i);
  if (multPlusMinusMatch) {
    const inner = multPlusMinusMatch[1].trim();
    const hasMult = /multiplied by/i.test(inner);
    const hasPlusMinus = /\s+(plus|minus)\s+/i.test(inner);
    if (hasMult && hasPlusMinus) {
      const parts = inner.split(/(\s+(?:plus|minus)\s+)/i);
      const terms: number[] = [];
      const ops: string[] = [];
      for (let i = 0; i < parts.length; i++) {
        if (/^\s*(plus|minus)\s*$/i.test(parts[i])) {
          ops.push(parts[i].trim().toLowerCase());
        } else {
          const termStr = parts[i].trim();
          const factors = termStr.split(/\s+multiplied by\s+/i).map((s) => parseInt(s.trim(), 10));
          terms.push(factors.reduce((a, b) => a * b, 1));
        }
      }
      let acc = terms[0];
      for (let i = 0; i < ops.length; i++) {
        acc = ops[i] === "plus" ? acc + terms[i + 1] : acc - terms[i + 1];
      }
      return String(acc);
    }
  }

  const plusMinusMatch = query.match(/what is (.+?)\s*\?\s*$/i);
  if (plusMinusMatch) {
    const inner = plusMinusMatch[1].trim();
    if (/^\d+(\s+(plus|minus)\s+\d+)+$/i.test(inner)) {
      const parts = inner.split(/(\s+(?:plus|minus)\s+)/i);
      let acc = parseInt(parts[0], 10);
      for (let i = 1; i < parts.length; i += 2) {
        const op = parts[i].trim().toLowerCase();
        const num = parseInt(parts[i + 1], 10);
        acc = op === "plus" ? acc + num : acc - num;
      }
      return String(acc);
    }
  }

  const minusMatch = query.match(/what is (\d+) minus (\d+)/i);
  if (minusMatch) {
    return String(parseInt(minusMatch[1], 10) - parseInt(minusMatch[2], 10));
  }

  const multipliedMatch = query.match(/what is (\d+) multiplied by (\d+)(?:\s|\?|$)/i);
  if (multipliedMatch) {
    return String(parseInt(multipliedMatch[1], 10) * parseInt(multipliedMatch[2], 10));
  }

  const plusMatch = query.match(/what is (\d+)\s*\+\s*(\d+)/i);
  if (plusMatch) {
    return String(parseInt(plusMatch[1], 10) + parseInt(plusMatch[2], 10));
  }

  const primesMatch = query.match(/which of the following numbers are primes:\s*([\d,\s]+)/i);
  if (primesMatch) {
    const numbers = primesMatch[1].split(",").map((s) => parseInt(s.trim(), 10));
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
      return true;
    };
    const primes = numbers.filter(isPrime);
    return primes.length > 0 ? primes.join(", ") : "";
  }

  const anagramMatch = query.match(/which of the following is an anagram of (\w+):\s*([\w,\s]+)/i);
  if (anagramMatch) {
    const target = anagramMatch[1].toLowerCase();
    const norm = (s: string) => s.toLowerCase().split("").sort().join("");
    const targetNorm = norm(target);
    const options = anagramMatch[2].split(",").map((s) => s.trim());
    const anagrams = options.filter((w) => w.length === target.length && norm(w) === targetNorm);
    return anagrams.length > 0 ? anagrams.join(", ") : "";
  }

  const scrabbleMatch = query.match(/what is the scrabble score of (\w+)/i);
  if (scrabbleMatch) {
    const SCORES: Record<string, number> = {
      a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
      n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
    };
    const word = scrabbleMatch[1].toLowerCase();
    const total = word.split("").reduce((sum, c) => sum + (SCORES[c] ?? 0), 0);
    return String(total);
  }

  return "";
}
