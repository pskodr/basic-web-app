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

  return "";
}
