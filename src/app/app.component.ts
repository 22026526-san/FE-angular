import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_MODULES } from './material/material-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  protected readonly title = signal('angular-intern');
}
