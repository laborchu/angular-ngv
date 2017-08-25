import {
  Component,
  AfterContentChecked,
  Input
} from '@angular/core';
import { NgvDataGridConfig, NgvDataGridOption, NgvDataGridOpBtnOption, NgvDataGridColumnOption, NgvDsDataGridModel, NgvDsDataGridPageModel } from './datagrid.config';

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
                    <input *ngIf="filter.type=='radio'" name="{{filter.property}}" type="radio" [(ngModel)]="searchParams[filter.property]" [value]="item.value">
                    <input *ngIf="filter.type=='checkbox'" name="{{filter.property}}" (change)="filterCheckboxChange(filter.property,$event)" type="checkbox" [value]="item.value">
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
                <button *ngFor="let btn of option.table.op.buttons" 
                        [hidden]="btn.hidden?btn.hidden(item):false"
                        (click)="btn.action(item,dataIndex)"
                        class="btn btn-sm {{getBtnStyle(btn,item)}}">
                        {{getBtnText(btn,item)}}
                </button>
                <div class="btn-group"
                     [hidden]="groupButton.hidden?groupButton.hidden(item):false"
                     *ngFor="let groupButton of option.table.op.groupButtons" dropdown>
                    <button type="button" dropdownToggle
                            class="btn btn-sm dropdown-toggle {{getBtnStyle(groupButton,item)}}">
                        {{getBtnText(groupButton,item)}}
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

      <nav class="pagination-nav">
        <ul class="pagination pg-blue">
          <li class="page-item" [ngClass]="{disabled:page?.firstDisable}">
            <a class="page-link" (click)="goto(1)" 
              href="javascript:void(0)" mdbRippleRadius>
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item" [ngClass]="{active:num==page?.pageIndex}" 
            *ngFor="let num of page?.numArray">
            <a class="page-link" (click)="goto(num)" 
            href="javascript:void(0)" mdbRippleRadius>{{num}}</a>
          </li>
          <li class="page-item" [ngClass]="{disabled:page?.endDisable}">
            <a class="page-link" (click)="goto(page.pageCount)" 
              href="javascript:void(0)" mdbRippleRadius>
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>
  `
})
export class NgvDataGrid implements  AfterContentChecked {
  constructor(config: NgvDataGridConfig) {
  }

  @Input() option: NgvDataGridOption;
  page: NgvDsDataGridPageModel;
  data: Array<any> = [];
  searchParams: any = {};

  ngOnInit() {
    this.search();
    if (this.option.toolbar && this.option.toolbar.filters) {
      for (let filter of this.option.toolbar.filters) {
        if (filter.value!==undefined){
          this.searchParams[filter.property] = filter.value;
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


  getBtnText = function(col: NgvDataGridOpBtnOption,item: any) {
    if (typeof col.text === "function") {
      return col.text(item);
    } else {
      return col.text;
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
      if (typeof col.propertyPipe === "function") {
        return col.propertyPipe(col.property, item);
      }else{
        if (Array.isArray(col.propertyPipe)){
          let value: any;
          for (let pipe of col.propertyPipe){
            value = pipe.transform(col.property, item, value);
          }
          return value;
        }else{
          return col.propertyPipe.transform(col.property, item);
        }
      }
    } else {
      return item[col.property];
    }
  }

  getPropertyClass = function(item: any, col: NgvDataGridColumnOption) {
    if (col.propertyClassPipe) {
      if (Array.isArray(col.propertyClassPipe)) {
        let value: any;
        for (let pipe of col.propertyClassPipe) {
          value = pipe.transform(col.property, item, value);
        }
        return value;
      } else {
        return col.propertyClassPipe.transform(col.property,item);
      }
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
    this.option.dataSource.getData(this.searchParams).then((model: NgvDsDataGridModel) => {
      this.data = model.data;
      // this.data = this.data.slice();
      this.resetPage(model.page);
    });
  }

  goto(pageNum:number){
     this.searchParams.pageIndex = pageNum;
     this.search();
  }

  resetPage(page: NgvDsDataGridPageModel) {
    this.page = page;
    this.searchParams.pageIndex = page.pageIndex;
    page.numArray = [];
    let rightRepairCount = 0;
    let leftRepairCount = 0;
    for (let i = page.pageIndex - 2; i <= page.pageIndex + 2; i++) {
      if (i > 0 && i <= page.pageCount) {
        page.numArray.push(i);
      }
      if (i <= 0) {
        if ((page.pageIndex + 2 + (rightRepairCount + 1) <= page.pageCount)) {
          rightRepairCount++;
        }
      } else if (i > page.pageCount) {
        if ((page.pageIndex - 2 - (leftRepairCount + 1))>=1) {
          leftRepairCount++;
        }
      }
    }
    for (let i = 1; i <= rightRepairCount;i++){
      page.numArray.push(page.numArray[page.numArray.length-1] + 1);
    }
    for (let i = 1; i <= leftRepairCount; i++) {
      page.numArray.unshift(page.numArray[0] - 1);
    }
    if (page.numArray[0] == 1) {
      page.firstDisable = true;
    }
    if (page.numArray[page.numArray.length - 1] == page.pageCount) {
      page.endDisable = true;
    }
  }

  ngAfterContentChecked() {
  }

}
