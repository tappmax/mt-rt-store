import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'get'
})
export class GetPipe implements PipeTransform {
  transform<T, K extends keyof T>(value: T[], key: K, val: T[K]) {
    return value.find(v => v[key] === val);
  }
}
