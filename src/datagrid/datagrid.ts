import {
  Component,
  AfterContentChecked,
  Input
} from '@angular/core';
import { NgvDataGridConfig, NgvDataGridOption, NgvDataGridOpBtnOption, NgvDataGridColumnOption } from './datagrid.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-datagrid',
  exportAs: 'ngvDataGrid',
  template: `
    <div class="ngv-datagrid">

      <div class="ngv-datagrid-toolbar" *ngIf="option.toolbar">
        <div class="row">
          <div class="col form-inline toolbar-left" *ngIf="option.toolbar.search">
            <div class="md-form form-group search-group">
                <input mdbActive type="text" class="form-control" [(ngModel)]="searchParams[option.toolbar.search.property]">
                <label>{{option.toolbar.search.placeholder}}</label>
            </div>
            <button type="button" class="btn btn-default waves-effect waves-light" (click)="search()">查询</button>
          </div>
          <div class="col form-inline toolbar-right">
            <div class="toolbar-right-btn">
              <button *ngFor="let btn of option.toolbar.buttons" (click)="btn.action(item)"
                      class="btn {{getToolbarBtnStyle(btn)}}">{{btn.text}}
              </button>
            </div>
          </div>
        </div>

        <div class="form-inline toolbar-filter" *ngFor="let filter of option?.toolbar?.filters">
          <div class="form-inline" *ngIf="filter.type=='radio'||filter.type=='checkbox'">
              <div class="form-group">
                  {{filter.label}}
              </div>
              <div class="form-group toolbar-filter-value" *ngFor="let item of filter.dataArray">
                  <label>
                    <span class="filter-item-label">{{item.label}}</span>
                    <input *ngIf="filter.type=='radio'" name="{{filter.property}}" type="radio" [(ngModel)]="searchParams[filter.property]" value="{{item.value}}">
                    <input *ngIf="filter.type=='checkbox'" name="{{filter.property}}" (change)="filterCheckboxChange(filter.property,$event)" type="checkbox" value="{{item.value}}">
                  </label>
              </div>
          </div>
          <div class="form-inline" *ngIf="filter.type=='select'">
            <div class="form-group">
                  {{filter.label}}
            </div>
            <div class="form-group">
                <select class="form-control" [(ngModel)]="searchParams[filter.property]">
                <option *ngFor="let item of filter.dataArray" value="{{item.value}}">{{item.label}}</option>
              </select>
            </div>
          </div>
        </div>
        

      </div>
      
      <table class="ngv-table table">
        <thead class="mdb-color darken-3">
        <tr class="text-white">
            <th *ngFor="let col of option.table.columns"  [style.width.px]="col.width">{{col.text}}</th>
            <th *ngIf="option.table.op"  [style.width.px]="option.table.op.width">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of data">
            <td *ngFor="let col of option.table.columns;let dataIndex=index"
                title="{{col.title? (item[col.property]):''}}"
                [ngClass]="{overflow:col.overflow}">
                <span [ngClass]="getPropertyClass(item,col)" [innerHTML]="getColInnerHtml(item,col)"></span>
            </td>
            <td *ngIf="option.table.op" class="op-td">
                <button *ngFor="let btn of option.table.op.buttons" (click)="btn.action(item,dataIndex)"
                        class="btn btn-sm {{getBtnStyle(btn,item)}}">{{btn.text}}
                </button>
                <div class="btn-group" *ngFor="let groupButton of option.table.op.groupButtons" dropdown>
                    <button type="button" dropdownToggle
                            class="btn btn-sm dropdown-toggle {{getBtnStyle(groupButton,item)}}">
                        {{groupButton.text}}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" *ngFor="let gbtn of groupButton.buttons" (click)="gbtn.action(item,dataIndex)">
                            {{gbtn.text}}
                        </a>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    </div>
  `
})
export class NgvDataGrid implements  AfterContentChecked {
  constructor(config: NgvDataGridConfig) {
  }

  @Input() option: NgvDataGridOption;
  data: Array<any> = [];
  searchParams: any = {};

  ngOnInit() {
    this.search();
    if (this.option.toolbar && this.option.toolbar.filters) {
      for (let filter of this.option.toolbar.filters) {
        if (filter.value!==undefined){
          if(filter.type=='radio'||filter.type=='checkbox'){
            this.searchParams[filter.property] = filter.value;
          }
        }
        filter.dataSource.getData({}).then((data:Array<any>)=>{
          filter.dataArray = data;
        });
      }
    }
  }

  getBtnStyle = function(btn: NgvDataGridOpBtnOption, item: any) {
    if (btn.style) {
      if (typeof btn.style === "function") {
        return btn.style(item);
      } else {
        return btn["style"];
      }
    } else {
      return 'btn-outline-default';
    }
  }

  getToolbarBtnStyle = function(btn: NgvDataGridOpBtnOption) {
    if (btn.style) {
      if (typeof btn.style === "function") {
        return btn.style(null);
      } else {
        return btn["style"];
      }
    } else {
      return 'btn-primary';
    }
  }

  getColInnerHtml = function(item: any, col: NgvDataGridColumnOption){
    if (col.propertyPipe){
      return col.propertyPipe.transform(item[col.property]);
    }else{
      return item[col.property];
    }
  }

  getPropertyClass = function(item: any, col: NgvDataGridColumnOption) {
    if (col.propertyClassPipe) {
      return col.propertyClassPipe.transform(item[col.property]);
    } else {
      return "";
    }
  }

  filterCheckboxChange = function(property: string, event:any) {
    if (!this.searchParams[property]) {
      this.searchParams[property] = [];
    }
    let data = this.searchParams[property];
    if (event.currentTarget.checked) {
      data.push(event.currentTarget.value);
    } else {
      data.splice(data.indexOf(event.currentTarget.value), 1);
    }
  }

  search(){
    debugger
    this.option.dataSource.getData(this.searchParams).then((data: Array<any>) => {
      this.data = data;
    });
  }

  ngAfterContentChecked() {
  }

}
