export class SearchParams {
  constructor(private keywords: string[] = [], private excludedTerms: string[] = [], private source: string = '') {}

  getKeywords() {
    return this.keywords;
  }

  getExcludedTerms() {
    return this.excludedTerms;
  }

  getSource() {
    return 'ruled.me';
    // return this.source;
  }
}
