import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any[], searchString: any): any {
    if (!value) return value;
    return value.filter((item) => item.entityName == searchString);
  }

}
