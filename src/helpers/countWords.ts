export function countWords(str: string) {
  let cleanedString = str.replace(/[*_`~\-#]|(\[[^\]]*\]\([^)]*\))/g, "");
  return cleanedString.trim().split(/\s+/).length;
}
