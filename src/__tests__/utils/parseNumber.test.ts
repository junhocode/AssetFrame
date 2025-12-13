import { describe, expect, it } from '@jest/globals';
import { parseNumber } from '@/utils/parseNumber';

describe("parseNumber", () => {
  it("input 0", () => {
    expect(parseNumber(0)).toBe("0");
  });

  describe("input million", () => {
    it("formats million to m", () => {
      expect(parseNumber(1000000)).toBe("1.00M");
      expect(parseNumber(1500000)).toBe("1.50M");
      expect(parseNumber(20000000)).toBe("20.00M");
    });

    it("handels rounding", () => {
      expect(parseNumber(1234500)).toBe("1.23M");
      expect(parseNumber(1235500)).toBe("1.24M");
    });
  });

  describe("input thousand", () => {
    it("formats thousand to k", () => {
      expect(parseNumber(1000)).toBe("1.00K");
      expect(parseNumber(1500)).toBe("1.50K");
      expect(parseNumber(999000)).toBe("999.00K");
    });

    it("handels rounding", () => {
      expect(parseNumber(1234)).toBe("1.23K");
      expect(parseNumber(1236)).toBe("1.24K");
    });
  });

  describe("under thousand", () => {
    it("formats", () => {
      expect(parseNumber(1)).toBe("1.00");
      expect(parseNumber(100)).toBe("100.00");
      expect(parseNumber(999)).toBe("999.00");
    });

    it("handles rounding", () => {
      expect(parseNumber(10.5)).toBe("10.50");
      expect(parseNumber(10.567)).toBe("10.57");
    });
  });

  describe("edge cases", () => {
    it("handles negative numbers", () => {
      expect(parseNumber(-5000)).toBe("-5,000.00");
      expect(parseNumber(-123.456)).toBe("-123.46");
    });
  });
});