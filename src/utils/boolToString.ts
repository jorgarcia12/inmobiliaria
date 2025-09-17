export const boolToString = (value: boolean) => (value ? "Si" : "No");

export const toBool = (val: unknown): boolean =>
  val === true || val === "true" || val === 1 || val === "1" ? true : false;
