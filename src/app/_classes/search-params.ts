export class SearchParams {
  constructor(private keywords: string[]) {}

  getKeywords() {
    return this.keywords;
  }
}
