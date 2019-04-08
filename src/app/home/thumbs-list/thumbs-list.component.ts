import { Component, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { HomeState } from '../home.state';

import { Observable } from 'rxjs';
import { HomeModel } from '../home.models';

@Component({
  selector: 'thumbs-list',
  templateUrl: './thumbs-list.component.html',
  styleUrls: ['./thumbs-list.component.scss']
})
export class ThumbsListComponent implements OnInit {

  @Select(HomeState) home$: Observable<HomeModel>;

  constructor() {}

  ngOnInit() {}

}
