// hooks/use-fuzzy-search.ts
export function useFuzzySearch() {
  const calculateScore = (text: string, query: string): number => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return 0;

    if (lowerText === lowerQuery) return 1000;
    if (lowerText.startsWith(lowerQuery)) return 500;

    const words = lowerQuery.split(" ").filter(Boolean);
    let score = 0;

    words.forEach((word) => {
      if (lowerText.includes(word)) {
        const index = lowerText.indexOf(word);
        score += 100 - index * 0.1;
        const wordBoundary = index === 0 || lowerText[index - 1] === " ";
        if (wordBoundary) score += 50;
      }
    });

    const queryChars = lowerQuery.replace(/\s/g, "").split("");
    let lastIndex = -1;
    let consecutiveMatches = 0;

    queryChars.forEach((char) => {
      const index = lowerText.indexOf(char, lastIndex + 1);
      if (index > -1) {
        if (index === lastIndex + 1) {
          consecutiveMatches++;
          score += consecutiveMatches * 5;
        } else {
          consecutiveMatches = 0;
        }
        score += 10;
        lastIndex = index;
      }
    });

    return Math.max(0, Math.round(score));
  };

  const search = <T extends Record<string, any>>(items: T[], query: string, fields: (keyof T)[]): T[] => {
    if (!query.trim()) return [];

    const scoredItems = items.map((item) => {
      let maxScore = 0;
      fields.forEach((field) => {
        const value = item[field];
        if (value) {
          const fieldScore = calculateScore(String(value), query);
          maxScore = Math.max(maxScore, fieldScore);
        }
      });
      return { item, score: maxScore };
    });

    return scoredItems
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  };

  return { search };
}
