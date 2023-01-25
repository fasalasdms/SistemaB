import {Component,OnInit,  Inject, AfterViewInit, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import {MatDialogRef, MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import {FormControl,Validators,FormGroup,FormBuilder} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ApiService} from 'app/services/api.service';
import { AlertaModalComponent } from '../alerta-modal/alerta-modal.component';
import { PosService } from 'app/services/pos.service';
import { IngresoRapidoComponent } from '../ingresoRapido/ingresoRapido.component';
import { Actividad, Ciudad, ClientePost, Departamento, Estado, FormaPago, Origen, Pais, TipoCliente, TipoPerfil, Zona } from 'app/model/Cliente';

moment.locale('es');

@Component({
   
  selector: 'app-cliente-venta-modal-servicio',
    
  templateUrl: './cliente-venta.component.html',
    
  styleUrls: ['./cliente-venta.component.scss']

})

export class clienteVentaComponent implements OnInit, AfterViewInit, OnDestroy {

sending = false;

selected: any = null;

item: any;

tableData: any[] = [];

step1: FormGroup;

step2: FormGroup;

step3: FormGroup;

paises: any;

perfiles: any;

tipoCliente: any;

formaPago: any;

origenes: any;

actividades: any;

zonas: any;

Estado: any;

idPais: any;

Departamento: any;

idDepartamento: string;

Ciudades: any;

dv: any;

cliente: any;

    constructor(
        
      public dialog: MatDialog,
      
      private _formBuilder: FormBuilder,
      
      private apiService: ApiService,
      
      private posService:PosService

    ) { }

    ngOnInit() {

        this.step1 = this._formBuilder.group({

          nombre1: ['', Validators.required],
          
          nombre2: ['', ],
          
          apellido1: ['', Validators.required],
          
          apellido2: ['', ],
          
          telefono1: ['', Validators.required],
          
          telefono2: ['', ],
          
          fechaCumpleanio: ['', ],
          
          email: ['', Validators.email],

        });

        this.step2 = this._formBuilder.group({

           actividad: [, []],
           
           origen: [, []],
           
           privado: [, []],
           
           tipoPerfil: [, []],
           
           tipoIdentificacion: [, []],
           
           formaPago: [, []],
           
           nit: [, []],
           
           estado: [, []],
           
           tipoTributario: [, []],
            
        }),
        
        this.step3 = this._formBuilder.group({

            idZona: ['', Validators.required],
            
            departamento: ['', Validators.required],
            
            direccion: ['', Validators.required],
            
            pais: ['', Validators.required],
          
        });

        this.dataFomulario()
    }

    openEditModal() {
        
    const dialogRef = this.dialog.open(IngresoRapidoComponent, {
           
        width: '400px',
           
        height: 'auto',
           
        maxHeight: '850px',
    
      });
    
        dialogRef.afterClosed().subscribe((result: any) => {
         
          var dia = result.fechaCumpleanio.slice(0,2)
          
          var mes = result.fechaCumpleanio.slice(2, 4)
          
          var anio = result.fechaCumpleanio.slice(4, 9)

          var fecha = `${mes}/${dia}/${anio}`          
          // console.log(' dia', dia)
          // console.log(' mes', mes)
          // console.log(' año', anio)
          // console.log('Fecha Completa', fecha)
          this.step1.setValue({     
           
            nombre1: result.nombre1, 
           
            nombre2: result.nombre2, 
           
            apellido1: result.apellido1, 
           
            apellido2: result.apellido2, 
           
            fechaCumpleanio: moment(fecha).format(),
           
            telefono1: '', 
           
            telefono2: '',
           
            email: '', 
         
          });
  
          this.step2.setValue({
             
            nit: result.nit,   
            
            actividad: '',
            
            origen: '',
            
            privado: '',
            
            tipoPerfil: '',
            
            tipoIdentificacion: '',
            
            formaPago: '',
            
            estado: '',
            
            tipoTributario: '',
         
              }
            );
            if (!result) return;
          }
        );
      }

    openAlertaModal(datos: any = null, tipo) {
    
    const dialogRef = this.dialog.open(AlertaModalComponent, {
        
      width: '350px',
      
      height: 'auto',
      
      maxHeight: '850px',
  
          data: {
              
            item: datos,
              
            tipo: tipo
            
            }
        }
      );
  
      dialogRef.afterClosed().subscribe((result: any) => {
        
        if(result == 1){
          
          this.step1.reset();
          
          this.step2.reset();
          
          this.step3.reset();
       
        }
       
        if (!result) return;
        
        }
      );
    }

    saveUser() {

        const step1 = this.step1.value;
        
        const step2 = this.step2.value;
        
        const step3 = this.step3.value;

        const dataDV = this.step2.value.nit;
        
        //validando el documento de verificacion
        
        if(this.step2.value.tipoIdentificacion == 'NIT'){
        
          this.dv = dataDV.split('-')
        
        } else {
        
          this.dv = 0
        
        }
        
        this.cliente =
        {

          idCliente: 0,
          
          razonSocial: `${step1.nombre1} ${step1.apellido1}`,
          
          url: ``,
          
          tipoCliente: 314,
          
          notas: "",
          
          cupo: 0,
          
          digito: this.dv[1],
          
          idContacto: 0,
          
          codigo: "",
          
          idTributario2: "0",
          
          //primer formulario
          nombre1: step1.nombre1 !== '' && step1.nombre1 !== undefined ? `${step1.nombre1}` : `"."`,
          
          nombre2: step1.nombre2 !== '' && step1.nombre2 !== undefined ? `${step1.nombre2}` : `"."`,
          
          apellido1: step1.apellido1 !== '' && step1.apellido1 !== undefined ? `${step1.apellido1}` : `"."`,
          
          apellido2: step1.apellido2 !== '' && step1.apellido2 !== undefined ? `${step1.apellido2}` : `"."`,
          
          telefono1: step1.telefono1 !== '' && step1.telefono1 !== undefined ? `${step1.telefono1}` : `"."`,
          
          telefono2: step1.telefono2 !== '' && step1.telefono2 !== undefined ? `${step1.telefono2}` : `"."`,
          
          fechaCumpleanio: step1.fechaCumpleanio !== '' && step1.fechaCumpleanio !== undefined ? `${moment(step1.fechaCumpleanio).format()}` : `2022-12-28T14:07:23.366Z`,
          
          email: step1.email !== '' && step1.email !== undefined ? `${step1.email}` : `"cliente@dms.com"`,
          
          //segundo formulario
          actividad: step2.actividad !== '' && step2.actividad !== undefined ? `${step2.actividad}` : `0`,
          
          origen: step2.origen !== '' && step2.origen !== undefined ? `${step2.origen}` : `0`,
          
          tipoPerfil: step2.tipoPerfil !== '' && step2.tipoPerfil !== undefined ? `${step2.tipoPerfil}` : `0`,
          
          tipoIdentificacion: step2.tipoIdentificacion !== '' && step2.tipoIdentificacion !== undefined ? `${step2.tipoIdentificacion}` : `"."`,
          
          formaPago: step2.formaPago !== '' && step2.formaPago !== undefined ? `${step2.formaPago}` : `0`,
          
          nit: step2.nit !== '' && step2.nit !== undefined ? `${step2.nit}` : `"."`,
          
          estado: step2.estado !== '' && step2.estado !== undefined ? `${step2.estado}` : `0`,
          
          tipoTributario: step2.tipoTributario !== '' && step2.tipoTributario !== undefined ? `${step2.tipoTributario}` : `0`,
          
          //tercer formulario
          idZona: step3.idZona !== '' && step3.idZona !== undefined ? `${step3.idZona}` : `0`,
          
       // departamento: step3.departamento !== '' && step3.departamento !== undefined ? `departamento: ${step3.departamento}` : `departamento: "."`, 
          
          direccion: step3.direccion !== '' && step3.direccion !== undefined ? `${step3.direccion}` : `"."`,
          
          pais: step3.pais !== '' && step3.pais !== undefined ? `${step3.pais}` : `0`,

        }

          this.apiService.postClientes(this.cliente).subscribe((data: ClientePost) => {
           
            if (data) {
               
               this.openAlertaModal(2, 2)
              
               console.log(data)
              
               this.clienteDisparador(step2.nit)
           
            }
          
          }, 
          
          error =>{
             
              this.openAlertaModal(error, 1)
             
              console.log('Oops... Ocurrio un Error', error.error, error.origen)
             }
           );
         }

    clienteDisparador(cambio: any) {
      
      this.posService.cliente.emit({
      
        data: cambio
      
          }
        )
      }
    
    ngAfterViewInit() {}

    // close(params: any = null) {
    //     // this.dialogRef.close(params);
    // }

    ngOnDestroy(): void {}

    dataFomulario() {
        
        this.apiService.getDataAdicionalClientes("paises").subscribe((data: Pais) => {
        
            this.paises = data.result;
        
            console.log('paises', this.paises);
          }
        )
        
        this.apiService.getDataAdicionalClientes("tiposdeperfiles").subscribe((data: TipoPerfil) => {
        
            this.perfiles = data;
          
            console.log('tiposdeperfiles', this.perfiles);
          }
        )

        this.apiService.getDataAdicionalClientes("tiposdeclientes").subscribe((data: TipoCliente) => {
           
            this.tipoCliente = data;
          
            console.log('tiposdeclientes', this.tipoCliente);
          }
        )

        this.apiService.getDataAdicionalClientes("formasdepago").subscribe((data: FormaPago) => {
            
            this.formaPago = data;
            
            console.log("formasdepago", this.formaPago);
          }
        )

        this.apiService.getDataAdicionalClientes("origenes").subscribe((data: Origen) => {
            
          this.origenes = data;
            
          console.log("origenes", data);
          
          }
        )

        this.apiService.getDataAdicionalClientes("actividades").subscribe((data: Actividad) => {
           
          this.actividades = data;
            
          console.log("actividades", this.actividades);
          
          }
        )

        this.apiService.getDataAdicionalClientes("estados").subscribe((data: Estado) => {
           
            this.Estado = data;
            
            console.log("estados", data);
          
          }
        )

        this.apiService.getDataAdicionalClientes("zonas").subscribe((data: Zona) => {
            
          this.zonas = data;
            
          console.log("zonas", this.zonas);
          
          }
        )
    }
  
    getDepartamento(){
      
      this.apiService.getDepartamento(this.idPais).subscribe((data: Departamento) => {
        
        this.Departamento = data;
        
         console.log('departamentos',this.Departamento)
    
        }
      )
    }

    getCuidad(){
      
      this.apiService.getCiudades(this.idDepartamento).subscribe((data: Ciudad) => {
        
        this.Ciudades = data;
        
          console.log('ciudades',this.Ciudades)
        
        }
      )
    }

  public onEnterDepartamento(data: any) {  
      
    this.idPais = data
      
        console.log(this.idPais)
      
          if (this.idPais == '') { 

          } else {
       
        this.getDepartamento()
    
      }
    }

    public onEnterCiudad(data: any) {  
      
      this.idDepartamento = data;
      
        console.log(this.idDepartamento)
      
            if (this.idDepartamento == '') { 

            
            } else {
      
        this.getCuidad()
      
      }
    }
}
