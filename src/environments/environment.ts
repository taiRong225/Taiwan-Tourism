// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURLv2: 'https://tdx.transportdata.tw/api/basic/v2',
  baseURLv3: 'https://gist.motc.gov.tw/gist_api/v3',
  CLIENT_ID: 'tairong0225-638890de-1dda-48a3',
  CLIENT_SECRET: 'cd51aa7e-f40e-4bae-9f62-515b2d3bb65a',
  keyOfAuth: 'taiwan-tourism--jwt',
  emptyString: '無',
  noProvideCity: '未提供縣市',
  noImage160x160: './assets/images/NoImage-160x160.png',
  noImage250x200: './assets/images/NoImage-255x200.png',
  noImage345x160: './assets/images/NoImage-345x160.png',
  noImage1100x400: './assets/images/NoImage-1100x400.png',
  page: 0,
  perPage: 20,
  distanceInMeters: 1000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
