export function parseVariables(text) {
  const matches = text.match(/{{(.*?)}}/g) || [];

  const cleaned = matches.map(v =>
    v.replace(/[{}]/g, "").trim()
  );

  return [...new Set(cleaned)];
}