import { Component, OnInit, Input } from '@angular/core';

import { ThumbsItem } from '../home.models';

@Component({
  selector: 'thumbs-list-item',
  templateUrl: './thumbs-list-item.component.html',
  styleUrls: ['./thumbs-list-item.component.scss']
})
export class ThumbsListItemComponent implements OnInit {
  @Input() thumb: ThumbsItem;

  constructor() {}

  ngOnInit() {}
}
