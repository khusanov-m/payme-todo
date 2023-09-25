import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class PageTitleService extends TitleStrategy {
  public constructor(private readonly title: Title) {
    super();
  }

  public override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`PaymeDo || ${title}`);
    } else {
      this.title.setTitle('PaymeDo');
    }
  }
}

export const RouteTitleConfig = {
  provide: TitleStrategy,
  useClass: PageTitleService,
};
