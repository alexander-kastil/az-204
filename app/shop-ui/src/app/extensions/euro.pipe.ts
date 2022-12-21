import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toEuro',
})
export class EuroPipe implements PipeTransform {
  transform(value: number | null, args?: any): any {
    let result = `${value?.toFixed(2)} €`;
    return result;
  }
}
