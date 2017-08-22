import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
		// MDBBootstrapModule.forRoot(),

import { AppRoutingModule } from './app-routing.module';

import { DataGridComponent,PanelComponent,FormComponent } from './ngv/index';
import { SharedModule } from './shared/shared.module';

import { NgvModule } from '../../../src/index';

@NgModule({
	imports: [BrowserModule, HttpModule, AppRoutingModule,
		NgvModule.forRoot(),
		SharedModule.forRoot()],
	declarations: [AppComponent, DataGridComponent, PanelComponent, FormComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]

})
export class AppModule { }
