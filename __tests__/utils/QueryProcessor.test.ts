import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Rohan"
          ));
    })

    test('should return andrew id', () => {
        const query = "What is your andrew id?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "pchivatx"
          ));
    })

    test('should return largest number', () => {
        const query = "Which of the following numbers is the largest: 13, 3, 25?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("25");
    })

    test('should return numbers that are both square and cube', () => {
        expect(QueryProcessor("Which of the following numbers is both a square and a cube: 1521, 4984, 64, 2197, 4059, 1729, 4411?")).toBe("64");
        expect(QueryProcessor("Which of the following numbers is both a square and a cube: 934, 241, 512, 4849, 1818, 1, 3600?")).toBe("1");
    })

    test('should compute subtraction', () => {
        expect(QueryProcessor("What is 98 minus 78?")).toBe("20");
    })

    test('should compute multiplication', () => {
        expect(QueryProcessor("What is 16 multiplied by 56?")).toBe("896");
    })

    test('should compute addition', () => {
        expect(QueryProcessor("What is 9 + 10?")).toBe("19");
    })

    test('should return prime numbers', () => {
        expect(QueryProcessor("Which of the following numbers are primes: 18, 53, 22, 84, 30?")).toBe("53");
    })

    test('should compute power', () => {
        expect(QueryProcessor("What is 47 to the power of 92?")).not.toBe("");
        expect(QueryProcessor("What is 2 to the power of 10?")).toBe("1024");
    })

    test('should compute multiple plus', () => {
        expect(QueryProcessor("What is 34 plus 45 plus 56?")).toBe("135");
    })

    test('should compute plus and minus', () => {
        expect(QueryProcessor("What is 12 plus 23 minus 23?")).toBe("12");
    })

    test('should compute mixed minus multiplied by power', () => {
        expect(QueryProcessor("What is 12 minus 35 multiplied by 2 to the power of 9?")).toBe("-17908");
    })

    test('should compute multiplied by then plus', () => {
        expect(QueryProcessor("What is 22 multiplied by 54 plus 1?")).toBe("1189");
    })

    test('should return anagram of word', () => {
        expect(QueryProcessor("Which of the following is an anagram of listen: google, banana, enlists, silent?")).toBe("silent");
    })

    test('should return scrabble score', () => {
        expect(QueryProcessor("What is the scrabble score of cloud?")).toBe("8");
    })
});