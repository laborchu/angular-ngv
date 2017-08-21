import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';

import { DataGridComponent } from './ngv/index';
import { SharedModule } from './shared/shared.module';

import { NgvModule } from 'angular-ngv';

@NgModule({
	imports: [BrowserModule, HttpModule, AppRoutingModule,
		MDBBootstrapModule.forRoot(),
		NgvModule.forRoot(),
		SharedModule.forRoot()],
	declarations: [AppComponent, DataGridComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]

})
export class AppModule { }
