import {Component, OnInit} from '@angular/core';

import {
    NgvDataGridOption,
    NgvDataSource,
    NgvDsModel,
    NgvDsDataGridModel,
    DatagridDeepPropertyPipe
} from '../../../../../src/index';
import {DatagridPropertyPipe, DatagridPropertyBadgePipe} from '../../shared/pipe/index';

// pageSize: number; //每页个数
// pageCount: number; //页面总数
// pageIndex: number;//当前页数

class DemoDataSource implements NgvDataSource {
    getData(params: any): Promise<NgvDsDataGridModel> {
        return new Promise<NgvDsDataGridModel>((resolve, reject) => {
            let date = new Date();
            resolve({
                page: {
                    pageSize: 10,
                    pageCount: 10,
                    pageIndex: 10,
                },
                data: [
                    {username: date.toISOString(), name: "胡立波", mobile: "13333333333", authStatus: 1, org: {name: 1}},
                    {username: "13999", name: "胡立波", mobile: "13333333331", authStatus: 0},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 0},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                    {username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1},
                ]
            });
        });
    }
}
class AuthStatusDataSource implements NgvDataSource {
    getData(params: any): Promise<NgvDsModel> {
        return new Promise<NgvDsModel>((resolve, reject) => {
            resolve([
                {label: "全部", value: 0},
                {label: "已认证", value: 1},
                {label: "未认证", value: 2}
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'datagrid.component.html',
    styleUrls: ['datagrid.component.css'],
})
export class DataGridComponent implements OnInit {

    constructor(private datagridPropertyPipe: DatagridPropertyPipe,
                private datagridPropertyBadgePipe: DatagridPropertyBadgePipe,
                private datagridDeepPropertyPipe: DatagridDeepPropertyPipe) {
    }

    option: NgvDataGridOption = {
        dataSource: new DemoDataSource(),
        toolbar: {
            search: {
                property: "keywords",
                placeholder: "请输入用户名/密码"
            },
            buttons: [
                {
                    text: '新增',
                    action: function (item) {
                    }
                },
                {
                    text: '导出',
                    action: function (item) {
                    }
                }
            ],
            filters: [
                {
                    label: '认证状态',
                    type: 'radio',
                    property: 'authStatus1',
                    value: 0,
                    dataSource: new AuthStatusDataSource()
                },
                {
                    label: '认证状态',
                    type: 'checkbox',
                    property: 'authStatus2',
                    value: 0,
                    dataSource: new AuthStatusDataSource()
                },
                {
                    label: '认证状态',
                    type: 'select',
                    property: 'authStatus3',
                    value: 0,
                    dataSource: new AuthStatusDataSource()
                },
            ]
        },
        table: {
            columns: [
                {text: '用户名', property: "username", width: "60px"},
                {text: '姓名', property: "name", width: "80px"},
                {text: '手机号', property: "mobile", width: "80px"},
                {
                    text: '认证状态',
                    property: "authStatus",
                    propertyPipe: this.datagridPropertyPipe,
                    propertyClassPipe: this.datagridPropertyBadgePipe,
                    width: "130px"
                },
                {
                    text: '企业名称',
                    property: "org.name",
                    propertyPipe: [this.datagridDeepPropertyPipe, this.datagridPropertyPipe],
                    title: true,
                    overflow: true
                },
            ],
            op: {
                width: "130px",
                buttons: [
                    {
                        text: '修改',
                        action: function (item) {
                            alert(item);
                        }
                    },
                    {
                        text: '删除',
                        style: "btn-outline-danger",
                        hidden:(data)=>{
                            if(data.mobile=="13333333331"){
                                return true;
                            }
                            return false;
                        },
                        action: function (item) {
                            alert(item);
                        }
                    }
                ],
                groupButtons: [
                    {
                        text: '用户管理',
                        hidden:(data)=>{
                            if(data.mobile=="13333333331"){
                                return true;
                            }
                            return false;
                        },
                        buttons: [
                            {
                                text: "老师管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "学生管理",
                                hidden:(data)=>{
                                    if(data.mobile=="13333333331"){
                                        return true;
                                    }
                                    return false;
                                },
                                action: function (item) {
                                }
                            },
                            {
                                text: "家长管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "园务管理",
                                action: function (item) {
                                }
                            }
                        ]
                    }
                ]
            }

        }
    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
