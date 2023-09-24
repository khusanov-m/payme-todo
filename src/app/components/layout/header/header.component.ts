import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightOnRectangle,
  heroInformationCircle,
  heroUserCircle,
} from '@ng-icons/heroicons/outline';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, MatMenuModule, NgFor],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      heroUserCircle,
      heroArrowRightOnRectangle,
      heroInformationCircle,
    }),
  ],
})
export class HeaderComponent {
  public menuList = [
    {
      icon: 'heroInformationCircle',
      title: 'Profile',
      action: () => this._router.navigate(['/app/profile']),
      isReady: false,
    },
    {
      icon: 'heroArrowRightOnRectangle',
      title: 'Logout',
      action: () => this.logout(),
      isReady: true,
    },
  ];

  constructor(
    private _cookie: CookieService,
    private _router: Router
  ) {}

  private logout(): void {
    this._cookie.deleteAll();
    this._router.navigate(['/auth']);
  }
}
