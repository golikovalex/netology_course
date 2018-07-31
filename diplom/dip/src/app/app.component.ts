import { Component } from '@angular/core';
import {MenuService} from './MenuService/MenuService';
import {SocketService} from './SocketService/SocketService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[MenuService, SocketService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
