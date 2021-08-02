import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
@Input() totalCount!:number;
@Input() pageSize!:number;
@Output() pagerChange = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChanged(event: any) {
    this.pagerChange.emit(event.page)
  }

}
