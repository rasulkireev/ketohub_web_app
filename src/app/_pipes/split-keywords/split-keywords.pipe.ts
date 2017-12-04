import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitKeywords',
})

export class SplitKeywordsPipe implements PipeTransform {

  transform(value: string, args?: any): string[] {
    let words = value.toLowerCase().split(' ').filter(x => x !== '');
    const deletions: number[] = [];

    // Find keywords that are contained in other keywords (e.g. "be" in "beef").
    for (let i = 0; i < words.length; i += 1) {
      for (let j = 0; j < words.length; j += 1) {
        if (i === j) {
          continue;
        }
        if (words[j].indexOf(words[i]) >= 0) {
          deletions.unshift(i);
          break;
        }
      }
    }

    // Delete keywords that other keywords contain.
    for (let i = 0; i < deletions.length; i += 1) {
      delete words[deletions[i]];
    }
    words = words.filter(x => x !== '');
    return words;
  }

}
