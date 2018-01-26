import { Pipe, PipeTransform } from '@angular/core';
import { SearchParams } from '../../_classes/search-params';

@Pipe({
  name: 'parseSearchQuery',
})

export class ParseSearchQueryPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let keywords: string[] = [];
    let excludedTerms: string[] = [];

    for (const token of tokenizeQuery(value)) {
      if (token[0] === EXCLUDE_PREFIX) {
        excludedTerms.push(token.substring(1));
      } else {
        keywords.push(token);
      }
    }
    keywords = removeSubstrings(keywords);
    excludedTerms = removeSubstrings(excludedTerms);

    return new SearchParams(keywords, excludedTerms);
  }

}

const EXCLUDE_PREFIX = '-';

function tokenizeQuery(query: string) {
  let tokens = query.toLowerCase().split(/[\s,]/).filter(x => x !== '');

  tokens = removeDuplicateTokens(tokens);

  tokens = tokens.filter(x => x !== '');
  tokens = tokens.filter(x => x !== EXCLUDE_PREFIX);
  return tokens;
}

function removeSubstrings(tokens: string[]) {
  const substrings = new Set();
  // Find tokens that are contained in other tokens (e.g., "be" in "beef").
  for (let i = 0; i < tokens.length; i += 1) {
    for (let j = 0; j < tokens.length; j += 1) {
      if (i === j) {
        continue;
      }
      if (tokens[j].indexOf(tokens[i]) >= 0) {
        substrings.add(i);
        break;
      }
    }
  }

  const filtered: string[] = [];
  // Delete tokens that other tokens contain.
  for (let i = 0; i < tokens.length; i += 1) {
    if (substrings.has(i)) {
      continue;
    }
    filtered.push(tokens[i]);
  }
  return filtered;
}

function removeDuplicateTokens(tokens: string[]) {
  return Array.from(new Set(tokens));
}
