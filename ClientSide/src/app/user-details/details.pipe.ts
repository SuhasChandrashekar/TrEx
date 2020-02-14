import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'details'
})
export class DetailsPipe implements PipeTransform {

  transform(value: any[], queryUserString: any): any {
    if (!value) return value;
    return value.filter((item) => item.username == queryUserString);
  }
}
