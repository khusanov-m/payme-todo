import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';

interface ObsWithStatusResult<T> {
  loading?: boolean;
  value?: T;
  error?: string;
}

const defaultError = 'Something went wrong';

@Pipe({
  name: 'asyncLoading',
  standalone: true,
})
export class AsyncLoadingPipe implements PipeTransform {
  public transform<T = any>(
    val: Observable<T>
  ): Observable<ObsWithStatusResult<T>> {
    return val.pipe(
      map((value: any) => {
        console.log(value);
        return {
          loading: value.length === 0,
          error: !value ? defaultError : '',
          value: value,
        };
      }),
      startWith({ loading: true }),
      catchError(error =>
        of({
          loading: false,
          error: typeof error === 'string' ? error : defaultError,
        })
      )
    );
  }
}
