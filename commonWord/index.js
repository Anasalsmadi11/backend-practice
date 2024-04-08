// Array of words to ignore
const ignoredWords = ['the', 'they', 'this', 'that', 'there', 'where', 'when', 'why', 'how', 'in', 'is', 'are', 'was', 'were', 'am', 'are', 'be', 'on', 'at', 'by', 'with', 'from', 'for', 'about', 'into', 'out'];

/**
 * Finds the most common word in a text.
 *
 * @param {string} text - The text to analyze.
 * @returns {string} - A string containing the most common word and its frequency.
 */
function commonWord(text) {
  // Check for empty string or text with only ignored words
  if (!text) {
    return 'There is no text provided';
  }
  const normalizedText = text.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');
  if (normalizedText.every(word => ignoredWords.includes(word))) {
    return 'this text only has the ignored words only';
  }

  // Create a hash table to store word frequencies
  const wordCounts = {};

  // Iterate through the text and count word occurrences
  normalizedText.forEach(word => {
    if (!ignoredWords.includes(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });

  // Find the word with the highest frequency
  let mostCommonWord = '';
  let maxFrequency = 0;
  for (const word in wordCounts) {
    if (wordCounts[word] > maxFrequency) {
      mostCommonWord = word;
      maxFrequency = wordCounts[word];
    }
  }

  // Return the result string
  return `"${mostCommonWord}" is the word that predominates in this chapter.`;
}