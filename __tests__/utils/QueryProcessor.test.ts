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
});