import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe implements PipeTransform {
  transform<T>(value: T[], key: keyof T) {
    return value.map(v => v[key]);
  }
}
