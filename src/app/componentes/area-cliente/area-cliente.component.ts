import { Component, OnInit, ViewChild } from '@angular/core';
import { clienteVentaComponent } from 'app/modals/cliente-modal/cliente-venta.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, tap, debounceTime, distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { ApiService } from 'app/services/api.service';
import { PosService } from 'app/services/pos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaModalComponent } from 'app/modals/alerta-modal/alerta-modal.component';

@Component({
  selector: 'app-area-cliente',
  templateUrl: './area-cliente.component.html',
  styleUrls: ['./area-cliente.component.scss']
})

export class AreaClienteComponent implements OnInit {
 
  clienteForm = this.formBuilder.group({
   
    nit: [, []],
   
    razon: [, []],
   
    correo: [, [Validators.email]],
   
    telefono: [, []]
 
    }
  );
  
  dataSource: any [];
  
  dataNit = '';
  
  dataRazonSocial = '';
  
  dataCorreo = '';
  
  dataTelefono = '';
  
  crearCliente = false;
  
  detalleCliente = false;
  
  verCliente = true;
  
  dataGetCliente: any;
  
  numDataCliente: any;
  
  clienteContacto: any
  
  getCliente(nitActive = null){
    
    this.apiServive.getCliente(`nit=${this.dataNit}`, `razonSocial=${this.dataRazonSocial}`, `correo=${this.dataCorreo}`,`telefono=${this.dataTelefono}`).subscribe((data: any)=>{
      
      if (nitActive != null) 
        
        {
       
        this.numDataCliente = data.length;
         
      if (this.numDataCliente > 1 )
        
        {

          this.openAlertaModal(data, 3)
          
          this.clienteContacto = data 
    
        } 
        
      else 
        
        {
            this.dataSource = data[0];

            if (this.dataSource == undefined)
      
            {
              
              this._snackBar.open('Cliente No Encontrado.', null, {
                
                duration: 4000
              
                }
              );
            }
        }

        }
      
      else
      
        {
          this.dataSource = data[0];

          if (this.dataSource == undefined)
      
          {
            
            this._snackBar.open('Cliente No Encontrado.', null, {
              
              duration: 4000
            
              }
            );
          }
        }

        this.posService.setCliente$(data[0]);
        
     
    },
      
    error => {
        
      this._snackBar.open(error.error, null, {
      
        duration: 4000
      
      });
      
      console.log(error);
      
      }
    )
  }

  constructor(
              
    public dialog: MatDialog, 
              
    private _snackBar: MatSnackBar, 
              
    private posService: PosService,  
              
    private apiServive: ApiService, 
              
    private formBuilder: FormBuilder
            
    ) 

    { }
    
  ClienteFuncion(data){
    
    console.log(data)
    
    if(data == 1){
      
      this.verCliente = true
      
      this.crearCliente = false;
      
      this.detalleCliente = false;
    
    }
    
    if (data == 2) {
      
      this.crearCliente = true;
       
      this.verCliente = false;
       
      this.detalleCliente = false;
    
    }

    if (data == 3) {
      
      this.crearCliente = false;
      
      this.verCliente = false;
      
      this.detalleCliente = true;
    
    }
  }

  public onEnterNit(data: any) {  
    
    this.dataNit = data.target.value == '' ? '' :  data.target.value;
    
    if (this.dataNit == '') {
    
      this.dataSource = null;
    
    } else {
     
      this.getCliente(1)
      
      this.clienteForm.controls['nit'].reset()
      
      this.dataNit = '';
   
    }
  }

  public onEnterRazon(data: any) {
    
    this.dataRazonSocial = data.target.value == '' ? '' : data.target.value;
    
    if (this.dataRazonSocial == '') {
     
      this.dataSource = null;
   
    } else {
      
      this.getCliente()
      
      this.clienteForm.controls['razon'].reset()
      
      this.dataRazonSocial = ''
    
    }

  }

  public onEnterCorreo(data: any) {
    
    this.dataCorreo = data.target.value == '' ? '' : data.target.value;
    
    if (this.dataCorreo == '') {
      
      this.dataSource = null;
    
    } else {
      
      this.getCliente()
      
      this.clienteForm.controls['correo'].reset()
      
      this.dataCorreo = ''
    
    }

  }

  public onEnterTelefono(data: any) {
    
    this.dataTelefono = data.target.value == '' ? '' : data.target.value;
    
    if (this.dataTelefono == '') {
      
      this.dataSource = null;
    
    } else {
      
      this.getCliente()
      
      this.clienteForm.controls['telefono'].reset()
      
      this.dataTelefono = ''
    
    }

  }
  
  ngOnInit(): void {
    
    this.posService.cliente.subscribe(result => {
      
      this.dataNit = result.data
      
      this.getCliente()
      
      this.ClienteFuncion(1)
      
      console.log('recibiendo', result.data)
      
      }
    )
  }
 
  restar(){
    
    this.dataNit = '';
    
    this.dataRazonSocial = ''
    
    this.dataCorreo = ''
    
    this.dataTelefono = ''
    
    this.dataSource = undefined;
  
  }

  ngAfterViewInit() {
    
    this.setInitialValue();
  
  }

  ngOnDestroy() {
   
  }

  protected setInitialValue() {
 
  }

  openAlertaModal(datos: any = null, tipo) {

    const dialogRef = this.dialog.open(AlertaModalComponent, {

      width: '350px',

      height: 'auto',

      maxHeight: '850px',

      data: {

        cliente: datos,

        tipo: tipo

        }
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {

          let contactoSelect = this.clienteContacto.filter( clienteContacto =>
          
          clienteContacto.id_cot_cliente_contacto == result
          
        )
      
          this.dataSource = contactoSelect[0]
          
          this.posService.setCliente$(contactoSelect[0]);

      }

      if (!result) return;

      }
    );
  }

}
