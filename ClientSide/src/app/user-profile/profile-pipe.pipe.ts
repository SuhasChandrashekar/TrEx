import { Pipe, PipeTransform } from '@angular/core';
//Profile Pipe is used to filter the current username
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
