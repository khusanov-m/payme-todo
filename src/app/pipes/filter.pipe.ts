import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../features/todo/todo.types';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: TodoItem[], filterBy = '', filterValue = ''): TodoItem[] {
    if (!value.length || filterBy === '' || filterValue === '') return value;
    return value.filter(
      (item: TodoItem) => item[filterBy as keyof TodoItem] === filterValue
    );
  }
}
