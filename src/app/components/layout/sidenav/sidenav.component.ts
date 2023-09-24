import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightOnRectangle,
  heroCog6Tooth,
  heroHome,
  heroQuestionMarkCircle,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIconComponent,
    MatTooltipModule,
  ],
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      heroHome,
      heroCog6Tooth,
      heroQuestionMarkCircle,
      heroArrowRightOnRectangle,
    }),
  ],
})
export class SidenavComponent {
  navigation = [
    {
      path: '/app/todos/list',
      name: 'Todo List',
      icon: 'heroHome',
    },
    {
      path: '/app/coming-soon',
      name: 'Coming Soon',
      icon: 'heroCog6Tooth',
    },
  ];
}
