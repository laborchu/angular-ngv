export interface NgvDataSource {
	getData: (params: any) => Promise<NgvDsModel>;
}

export interface NgvDsModel {
}