export function cleanFilters<T extends Record<string, unknown>>(filters: T): Partial<T> {
  const cleaned: Partial<T> = {};

  Object.entries(filters as Record<string, unknown>).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== undefined &&
      value !== null &&
      !(typeof value === "number" && isNaN(value))
    ) {
      if (typeof value === "boolean") {
        if (value) {
          cleaned[key as keyof T] = value as T[keyof T];
        }
      } else {
        cleaned[key as keyof T] = value as T[keyof T];
      }
    }
  });

  return cleaned;
}

