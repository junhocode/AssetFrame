import { describe, expect, it } from '@jest/globals';
import { numberParser } from '@/utils/numberParser';

describe("numberParser", () => {
  it("input 0", () => {
    expect(numberParser(0)).toBe("0");
  });

  describe("input million", () => {
    it("formats million to m", () => {
      expect(numberParser(1000000)).toBe("1.00M");
      expect(numberParser(1500000)).toBe("1.50M");
      expect(numberParser(20000000)).toBe("20.00M");
    });

    it("handels rounding", () => {
      expect(numberParser(1234500)).toBe("1.23M");
      expect(numberParser(1235500)).toBe("1.24M");
    });
  });

  describe("input thousand", () => {
    it("formats thousand to k", () => {
      expect(numberParser(1000)).toBe("1.00K");
      expect(numberParser(1500)).toBe("1.50K");
      expect(numberParser(999000)).toBe("999.00K");
    });

    it("handels rounding", () => {
      expect(numberParser(1234)).toBe("1.23K");
      expect(numberParser(1236)).toBe("1.24K");
    });
  });

  describe("under thousand", () => {
    it("formats", () => {
      expect(numberParser(1)).toBe("1.00");
      expect(numberParser(100)).toBe("100.00");
      expect(numberParser(999)).toBe("999.00");
    });

    it("handles rounding", () => {
      expect(numberParser(10.5)).toBe("10.50");
      expect(numberParser(10.567)).toBe("10.57");
    });
  });

  describe("edge cases", () => {
    it("handles negative numbers", () => {
      expect(numberParser(-5000)).toBe("-5,000.00");
      expect(numberParser(-123.456)).toBe("-123.46");
    });
  });
});