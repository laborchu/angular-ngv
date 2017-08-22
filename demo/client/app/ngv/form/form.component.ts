import { Component, OnInit } from '@angular/core';

import { NgvFormOption} from '../../../../../src/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent implements OnInit {

  constructor() { }

  panelOption: NgvFormOption = {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
  }


}
