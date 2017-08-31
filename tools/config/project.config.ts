import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');


  NGV_SRC = `src`; 
  NGV_DEST = `dist/src`;


  NGV_LIB_DEST = `dist/lib`;

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    let additionalPackages: ExtendPackages[] = [{
      name: 'angular-bootstrap-md',
      path: 'node_modules/angular-bootstrap-md/bundles/angular-bootstrap-md.umd.js'
    },{
      name: 'angular-ngv',
      path: 'node_modules/angular-ngv/bundles/angular-ngv.umd.js'
    },{
      name: '@ng-bootstrap/ng-bootstrap',
      path: 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
    },{
      name: 'ngx-umeditor',
      path: 'node_modules/ngx-umeditor/bundles/ngx-umeditor.umd.js'
    },{
      name: 'ng2-validation',
      path: 'node_modules/ng2-validation/bundles/ng2-validation.umd.js'
    },{
      name: 'libphonenumber-js',
      path: 'node_modules/libphonenumber-js/bundle/libphonenumber-js.min.js'
    },{
      name: 'ngx-webuploader',
      path: 'node_modules/ngx-webuploader/bundles/ngx-webuploader.umd.js'
    }];

    //
    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
