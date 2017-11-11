import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightedResult'
})

export class HighlightedResultPipe implements PipeTransform {

  transform(value: string, keywords: string): any {
    if (keywords && value) {
      for (const keyword of keywords.split(' ')) {
        let startIndex = 0;
        startIndex = value.toLowerCase().indexOf(keyword.toLowerCase());
        while (startIndex !== -1) {
            const endLength = keyword.length;
            const matchingString = value.substr(startIndex, endLength);
            const replacement = `<mark>${matchingString}</mark>`;
            value = value.slice(0, startIndex) + replacement + value.slice(startIndex + keyword.length);
            startIndex = value.toLowerCase().indexOf(keyword.toLowerCase(), startIndex + replacement.length);
        }
      }
    }
    // Coalesce adjacent matches into a single <mark> tag.
    return value.replace(/<\/mark><mark>/g, '');
  }

}
