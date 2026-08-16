export const slugify = (name) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  const uniqueSuffix = Date.now().toString(36);
  return `${base}-${uniqueSuffix}`;
};