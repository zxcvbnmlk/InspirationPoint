import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgOptimizedImage, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ip-app';


  menuItems = [
    { label: 'Результаты', link: '/results' },
    { label: 'Рейтинги', link: '/ratings' },
    { label: 'События', link: '/events' }
  ];
}
