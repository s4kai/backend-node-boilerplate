import { describe, expect, it } from "vitest";
import { Result } from "./result";

describe("Result util class test", () => {
  it("should return a successful result", () => {
    const result = Result.ok("success");

    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBe("success");
  });

  it("should return a failure result", () => {
    const result = Result.fail(new Error("failure"));

    expect(result.isSuccess).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.errorValue()).toStrictEqual(new Error("failure"));
  });

  it("should combine results with one success and one fail", () => {
    const result1 = Result.ok("success");
    const result2 = Result.fail(new Error("failure"));

    const combinedResult = Result.combine([result1, result2]);

    expect(combinedResult.isFailure).toBe(true);
    expect(combinedResult.errorValue()).toStrictEqual(new Error("failure"));
  });

  it("should combine results with two success", () => {
    const result1 = Result.ok("success");
    const result2 = Result.ok("success");

    const combinedResult = Result.combine([result1, result2]);

    expect(combinedResult.isSuccess).toBe(true);
    expect(combinedResult.getValue()).toBeUndefined();
  });
});
