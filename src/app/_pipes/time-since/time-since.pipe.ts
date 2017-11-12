import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince',
})
export class TimeSincePipe implements PipeTransform {

  transform(startTimeStr: string, args?: any): any {
    const startTime = +new Date(startTimeStr);
    const now = +new Date();
    const milliseconds = now - startTime;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / (365 / 12);
    const years = days / 365;

    let interval;
    let units;

    // The interval calculation is not precise and does not account for things
    // like DST or leap years.
    if (Math.round(minutes) < 60) {
      interval = minutes;
      units = 'minutes';
    } else if (Math.round(hours) < 24) {
      interval = hours;
      units = 'hours';
    } else if (Math.round(days) < 90) {
      interval = days;
      units = 'days';
    } else if (Math.round(months) < 12) {
      interval = months;
      units = 'months';
    } else {
      interval = years;
      units = 'years';
    }

    interval = Math.round(interval);

    // Always round up from 0 to 1.
    if (interval === 0) {
      interval = 1;
    }

    // Truncate the trailing 's' if the value is 1.
    if (interval === 1) {
      units = units.substring(0, units.length - 1);
    }

    return interval + ' ' + units;
  }

}
