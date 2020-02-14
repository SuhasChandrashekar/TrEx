import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profilePipe'
})
export class ProfilePipePipe implements PipeTransform {

  transform(value: any[], queryMailString: any): any {
    if (!value) return value;
    return value.filter((item) =>
     item.userName == queryMailString);
  }

}
