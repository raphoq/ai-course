// Read-only audit annotations: these bodies lack a complete input/output date pair.
// Keep them in their classifier group; this is an evidence limit, not a new cause.
export const INCOMPLETE_DATE_PAIRS = ['R-41290', 'R-41417', 'R-41514', 'R-41615'] as const;
