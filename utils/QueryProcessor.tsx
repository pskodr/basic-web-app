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
    const sixthPowers = numbers.filter((n) => {
      const r = Math.round(Math.pow(n, 1 / 6));
      return r * r * r * r * r * r === n;
    });
    return sixthPowers.length > 0 ? sixthPowers.join(", ") : "";
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
