import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../../material/material-module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {}
