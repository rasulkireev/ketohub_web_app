import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(startTimeStr: string, args?: any): any {
    var startTime = +new Date(startTimeStr);
    var now = +new Date();
    var milliseconds = now - startTime;
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var months = days / (365 / 12);
    var years = days / 365;

    var interval;
    var units;

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
    if (interval == 0) {
      interval = 1;
    }

    // Truncate the trailing 's' if the value is 1.
    if (interval == 1) {
      units = units.substring(0, units.length - 1);
    }

    return interval + ' ' + units;
  }

}
