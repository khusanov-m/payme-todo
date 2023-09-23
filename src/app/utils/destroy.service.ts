import { DestroyRef, assertInInjectionContext, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function destroyFn(): Subject<void> {
  assertInInjectionContext(destroyFn);
  const destroy = new Subject<void>();
  inject(DestroyRef).onDestroy(() => {
    destroy.next();
    destroy.complete();
  });

  return destroy;
}
