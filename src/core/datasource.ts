export interface NgvDataSource {
	getData: (params: any) => Promise<Array<any>>;
}