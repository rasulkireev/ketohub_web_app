import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightedResult',
})

export class HighlightedResultPipe implements PipeTransform {

  transform(value: string, keywords: string[]): any {
    if (value == null || keywords == null) {
      return value;
    }

    // Find all matching substrings.
    const searchTarget = value.toLowerCase();
    let replacementRanges: StringRange[] = [];
    for (const keyword of keywords) {
      let index = 0;
      index = searchTarget.indexOf(keyword);
      while (index !== -1) {
        const range = new StringRange(index, keyword.length);
        replacementRanges.push(range);
        index += keyword.length;
        index = searchTarget.indexOf(keyword, index);
      }
    }

    // Sort matching substrings in ascending order of start index.
    replacementRanges = replacementRanges.sort((a, b) => {
      if (a.start <= b.start) {
        return -1;
      }
      return 1;
    });
    let rangeNumber: number = 0;

    // Coalesce together adjacent or overlapping ranges.
    while (rangeNumber < replacementRanges.length - 1) {
      const current: StringRange = replacementRanges[rangeNumber];
      const next: StringRange = replacementRanges[rangeNumber + 1];
      if ((current.start + current.length) >= next.start) {
        const coalesced = new StringRange(current.start,
          next.start + next.length - current.start);
        replacementRanges = replacementRanges.splice(0, rangeNumber)
          .concat(coalesced)
          .concat(replacementRanges.splice(rangeNumber + 2));
      } else {
        rangeNumber += 1;
      }
    }

    // Create a new string with <mark> tags added to the matching words.
    let highlightedValue: string = value;
    for (let i = replacementRanges.length - 1; i >= 0; i -= 1) {
      const start: number = replacementRanges[i].start;
      const length: number = replacementRanges[i].length;
      const matchingString = highlightedValue.substr(start, length);
      const replacement = `<mark>${matchingString}</mark>`;
      highlightedValue = highlightedValue.slice(0, start) + replacement
        + highlightedValue.slice(start + length);
    }
    return highlightedValue;
  }

}

class StringRange {
  constructor(public start: number, public length: number) {}

  public toString = () : string => {
    return `[${this.start}, ${this.length}]`;
  }
}
