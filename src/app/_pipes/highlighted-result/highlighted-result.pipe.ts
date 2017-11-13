import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightedResult',
})

export class HighlightedResultPipe implements PipeTransform {

  transform(value: string, keywords: string): any {
    let highlightedValue = value;
    if (keywords && highlightedValue) {
      for (const keyword of keywords.split(' ')) {
        if (!keyword) {
          continue;
        }
        let startIndex = 0;
        startIndex = highlightedValue.toLowerCase().indexOf(keyword.toLowerCase());
        while (startIndex !== -1) {
          const endLength = keyword.length;
          const matchingString = highlightedValue.substr(startIndex, endLength);
          const replacement = `<mark>${matchingString}</mark>`;
          highlightedValue = highlightedValue.slice(0, startIndex) + replacement + highlightedValue.slice(startIndex + keyword.length);
          startIndex = highlightedValue.toLowerCase().indexOf(keyword.toLowerCase(), startIndex + replacement.length);
        }
      }
    }
    // Coalesce adjacent matches into a single <mark> tag.
    return highlightedValue.replace(/<\/mark><mark>/g, '');
  }

}
