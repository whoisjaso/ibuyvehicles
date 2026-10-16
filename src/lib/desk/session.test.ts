import { describe, expect, it } from "vitest";
import { passcodeMatches, readSession, signSession } from "./session";

const SECRET = "x".repeat(40);

describe("desk session", () => {
  it("round-trips a signed session", async () => {
    const t = await signSession("mark", SECRET, 1_000);
    expect(await readSession(t, SECRET, 2_000)).toEqual({ who: "mark" });
  });
  it("rejects a tampered or expired session", async () => {
    const t = await signSession("mark", SECRET, 1_000);
    expect(await readSession(t.replace("mark", "anon"), SECRET, 2_000)).toBeNull();
    expect(await readSession(t, "y".repeat(40), 2_000)).toBeNull();
    expect(await readSession(t, SECRET, 1_000 + 31 * 86_400_000)).toBeNull();
    expect(await readSession(t, null)).toBeNull();
  });
  it("needs a real passcode", async () => {
    expect(await passcodeMatches("123456", "123456")).toBe(true);
    expect(await passcodeMatches("123457", "123456")).toBe(false);
    expect(await passcodeMatches("123", "123")).toBe(false);
    expect(await passcodeMatches("anything", undefined)).toBe(false);
  });
});
