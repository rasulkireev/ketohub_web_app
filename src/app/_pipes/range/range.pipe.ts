import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
})
export class RangePipe implements PipeTransform {

  transform(data: any[], page: number, size: number): any {
    // TODO(mtlynch): For some reason, data.slice returns an empty array even
    // though we can iterate over it, so we use this hacky workaround. Clean
    // this up.
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, data.length);
    const result = [];
    for (let i = startIndex; i < endIndex; i++) {
      result.push(data[i]);
    }
    return result;
  }
}
