import { Pipe, PipeTransform } from '@angular/core';
import { SearchParams } from '../../_classes/search-params';

@Pipe({
  name: 'parseSearchQuery',
})

export class ParseSearchQueryPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const keywords: string[] = [];
    const excludedTerms: string[] = [];

    for (const token of tokenizeQuery(value)) {
      if (token[0] === EXCLUDE_PREFIX) {
        excludedTerms.push(token.substring(1));
      } else {
        keywords.push(token);
      }
    }

    return new SearchParams(keywords, excludedTerms);
  }

}

const EXCLUDE_PREFIX = '-';

function tokenizeQuery(query: string) {
  let tokens = query.toLowerCase().split(' ').filter(x => x !== '');
  const deletions: number[] = [];

  tokens = removeDuplicateTokens(tokens);

  // Find tokens that are contained in other tokens (e.g., "be" in "beef").
  for (let i = 0; i < tokens.length; i += 1) {
    for (let j = 0; j < tokens.length; j += 1) {
      if (i === j) {
        continue;
      }
      if (tokens[j].indexOf(tokens[i]) >= 0) {
        deletions.unshift(i);
        break;
      }
    }
  }

  // Delete tokens that other tokens contain.
  for (let i = 0; i < deletions.length; i += 1) {
    delete tokens[deletions[i]];
  }
  tokens = tokens.filter(x => x !== '');
  tokens = tokens.filter(x => x !== EXCLUDE_PREFIX);
  return tokens;
}

function removeDuplicateTokens(tokens: string[]) {
  return Array.from(new Set(tokens));
}