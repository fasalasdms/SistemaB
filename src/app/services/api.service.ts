import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ciudad, Client, ClientePost, Departamento } from 'app/model/Cliente';
import { DataFactura } from 'app/model/DataFactura';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  prefijo="api";
  nodos = {
    apiUrlAutenticacion:environment.apiUrlAutenticacion,
    apiUrlBodegas:environment.apiUrlBodegas,
    apiUrlClientes:environment.apiUrlClientes,
    apiUrlProductos:environment.apiUrlProductos,
    apiUrlFacturacion:environment.apiUrlFacturacion,
    apiUrlPuntos:environment.apiUrlPuntos,
  }

  constructor(private _httpClient: HttpClient,) { }
  
  getCliente(nit: string, razonSocial:string, correo: string, telefono: string): Observable<Client> {
    
    const url = `${environment.apiUrlClientes}/api/Cliente?${nit}&${razonSocial}&${correo}&${telefono}`;
    
    return this._httpClient.get<Client>(url);
  
  }

  getClientes(): Observable<Client> {
   
    const url = `${environment.apiUrlClientes}/api/Cliente`;
   
    return this._httpClient.get<Client>(url);
 
  }

  getDataAdicionalClientes(Query: String): Observable<any> {
    
    const url = `${environment.apiUrlClientes}/api/clienteinformacion/${Query}`;
    
    return this._httpClient.get<any>(url);
  
  }

  getDepartamento(idPais: string): Observable<Departamento> {
    
    const url = `${environment.apiUrlClientes}/api/clienteinformacion/departamentos/${idPais}`;
    
    return this._httpClient.get<Departamento>(url);
  
  }

  getCiudades(idDepartamento: string): Observable<Ciudad> {
    
    const url = `${environment.apiUrlClientes}/api/clienteinformacion/ciudades/${idDepartamento}`;
    
    return this._httpClient.get<Ciudad>(url);
  
  }

  getQuery(_nodo:string,_nombreQuery:string,_paramsQuery:string){
    const nodo = this.nodos[_nodo];
    const nombreQuery = _nombreQuery;
    const paramsQuery = _paramsQuery?`?${_paramsQuery}`:``;
    return this._httpClient.get(`${nodo}/api/${nombreQuery}${paramsQuery}`);
  }

  postFactura(params: any): Observable<DataFactura> {
  
    const url = `${environment.apiUrlFacturacion}/api/Factura`;
  
    return this._httpClient.post<DataFactura>(url, params);
  
  }

  postClientes(params: any): Observable<ClientePost> {
    
    const url = `${environment.apiUrlClientes}/api/Cliente`;
    
    return this._httpClient.post<ClientePost>(url, params);
  
  }



  
  postQuery(){}
  putQuery(){}
  deleteQuery(){}
}
