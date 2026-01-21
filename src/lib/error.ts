export const raise = (msg: string) => {
  throw new Error(msg);
};

const prefix: string = "Invariant failed";
export function invariant(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: any,
  message?: string | (() => string)
): asserts condition {
  if (condition) {
    return;
  }

  const provided: string | undefined =
    typeof message === "function" ? message() : message;

  const value: string = provided ? `${prefix}: ${provided}` : prefix;
  throw new Error(value);
}
