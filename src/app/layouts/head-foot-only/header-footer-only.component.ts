import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_MODULES } from '../../material/material-module';
import { Footer } from '../../shared/components/footer/footer.component';
import { Header } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-header-footer-only',
  imports: [RouterOutlet, MATERIAL_MODULES, Header, Footer],
  templateUrl: './header-footer-only.component.html',
})
export class HeaderFooterOnlyComponent {}
