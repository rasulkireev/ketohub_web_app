export class SearchParams {
  constructor(private keywords: string[] = [], private excludedTerms: string[] = []) {}

  getKeywords() {
    return this.keywords;
  }

  getExcludedTerms() {
    return this.excludedTerms;
  }
}
