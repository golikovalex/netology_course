import { Component } from '@angular/core';
import {MenuService} from './MenuService/MenuService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[MenuService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
