// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//192.168.0.188

export const environment = {
    production: false,
    
    apiUrlAutenticacion:"http://192.168.0.104:8081",
    apiUrlBodegas:      "http://192.168.0.104:8082",
    apiUrlClientes:     "http://192.168.0.104:8083",
    apiUrlProductos:    "http://192.168.0.104:8084",
    apiUrlFacturacion:  "http://192.168.0.104:8085",
    apiUrlPuntos:       "http://192.168.0.104:8086",
     
    // apiUrlAutenticacion:"http://192.168.52.1:8081",
    // apiUrlBodegas:"http://192.168.52.1:8082",
    // apiUrlClientes:"http://192.168.52.1:8083",
    // apiUrlProductos:"http://192.168.52.1:8084",
    // apiUrlFacturacion: "http://192.168.52.1:8086",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
