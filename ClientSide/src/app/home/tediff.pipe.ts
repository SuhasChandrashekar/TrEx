import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tediff'
})
export class TediffPipe implements PipeTransform {

  transform(value: any[], queryString: any): any {
    if (!value) return value;
    return value.filter((item) => item.entityType == queryString);
  }

}
