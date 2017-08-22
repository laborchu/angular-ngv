import {
  Component,
  AfterContentChecked,
  Input
} from '@angular/core';
import { NgvPanelConfig, NgvPanelOption } from './panel.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-panel',
  exportAs: 'ngvPanel',
  template: `
    <div class="card ngv-panel">
        <div class="card-header mdb-color darken-3 white-text">
            <div class="panel-crumb">
              <span class="panel-crumb-item" [ngClass]="{'crumb-action':crumb.action}" 
              (click)="crumb.action&&crumb.action()"
              *ngFor="let crumb of option.crumbs; let i = index">
              {{crumb.text}} <span *ngIf="i!=(option.crumbs.length-1)">-</span>
              </span>
            </div>
        </div>
        <div class="card-body">
           <ng-content></ng-content>
        </div>
    </div>
  `
})
export class NgvPanel implements  AfterContentChecked {
  constructor(config: NgvPanelConfig) {
  }

  @Input() option: NgvPanelOption;

  ngOnInit() {
   
  }

  ngAfterContentChecked() {
  }

}
