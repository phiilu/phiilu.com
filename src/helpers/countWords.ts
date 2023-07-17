export function countWords(str: string) {
  const cleanedString = str.replace(/[*_`~\-#]|(\[[^\]]*\]\([^)]*\))/g, '');
  return cleanedString.trim().split(/\s+/).length;
}
