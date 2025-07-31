import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() addAction: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void { }

  onChangeData( $event: any ) {
    this.addAction.emit($event);
  }


}
