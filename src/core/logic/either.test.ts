import { describe, expect, it } from "vitest";
import { left, right, type Either } from "./either";

describe("Either util class test", () => {
  it("should return a left either", () => {
    const either = left("left");

    expect(either.isLeft()).toBe(true);
    expect(either.isRight()).toBe(false);
    expect(either.value).toBe("left");
  });

  it("should return a right either", () => {
    const either = right("right");

    expect(either.isLeft()).toBe(false);
    expect(either.isRight()).toBe(true);
    expect(either.value).toBe("right");
  });

  it("should return a left either typed a Either class", () => {
    const either: Either<string, Error> = right(new Error("test"));

    expect(either.isLeft()).toBe(false);
    expect(either.isRight()).toBe(true);
    expect(either.value).toStrictEqual(new Error("test"));
  });
});
