import { Injectable} from '@angular/core';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgvPanelConfig {

}

export type crumbsFunc = () => void;

export class NgvPanelOption {
	crumbs: Array<NgvPanelCrumbsOption>
    buttons?: Array<NgvPanelBtnOption>;

}

export class NgvPanelCrumbsOption {
	text: string;
	action?: crumbsFunc;
}

export interface NgvPanelBtnOption {
    text: string;
    style?: string;
    action: (data: any) => void;
}

