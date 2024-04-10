export const complexTextSearch = (source: string, target: string) => {
  const targetWords = target.toLowerCase().split(" ");
  // IF target does not have any spaces then just do a normal include
  if (targetWords.length === 1)
    return source.toLowerCase().includes(targetWords[0]);

  const sourceWords = source.toLowerCase().split(" ");

  // If target ha more words than the source the it should be false
  if (targetWords.length > sourceWords.length) return false;

  let sourceIndex = 0;
  let targetIndex = 0;

  console.log(source);

  while (sourceIndex < sourceWords.length && targetIndex < targetWords.length) {
    if (sourceWords[sourceIndex].startsWith(targetWords[targetIndex])) {
      sourceIndex++;
      targetIndex++;
    } else {
      sourceIndex++;
      targetIndex = 0;
    }
  }

  return targetIndex === targetWords.length;
};
