import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Car[], filterText: string): unknown {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:Car)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
