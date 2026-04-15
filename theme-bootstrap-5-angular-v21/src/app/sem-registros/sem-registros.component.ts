import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sem-registros',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './sem-registros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemRegistrosComponent {}
