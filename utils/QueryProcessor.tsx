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

  const multipliedMatch = query.match(/what is (\d+) multiplied by (\d+)/i);
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

  return "";
}
