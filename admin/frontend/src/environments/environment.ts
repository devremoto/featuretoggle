// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const HOST = 'http://localhost';


const STS_PORT = 44310;
const FRONT_PORT = 4200;
const MS_MONGO_PORT = 5051;
const STS_SERVER = `https://sts.skoruba.local`;
const STS_ADMIN_SERVER = `https://admin.skoruba.local`;
const GO_PORT = 8085;
const CLIENT_ID = 'feature_toggle_admin-dev';

export const environment = {
  production: false,
  HOST,
  STS_SERVER,
  STS_ADMIN_SERVER,
  FRONT_PORT,
  MS_MONGO_PORT,
  GO_PORT,
  STS_PORT,
  PATH: '',
  USE_AUTHORITY_SERVER: false,
  CLIENT_ID,
  useNgxSocket: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
