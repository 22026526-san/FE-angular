import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../../../material/material-module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './footer.component.html',
})
export class Footer {}
