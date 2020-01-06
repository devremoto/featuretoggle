import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlbr'
})
export class NlbrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.replace(/\n/gi, '<br />\n');
    }
    return null;
  }

}
