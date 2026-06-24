import { Component } from '@angular/core';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public version: string = packageInfo.version;
}
