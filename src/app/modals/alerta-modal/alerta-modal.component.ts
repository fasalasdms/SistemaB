import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';


@Component({
  
  selector: 'alerta-modal.component',
  
  templateUrl: 'alerta-modal.component.html',

})

export class AlertaModalComponent {
    
  dataTipo: any;
  
  error: any;
  
  errorOrigen: any;
  
  dataError: any;
  
  detallado: any;
  
  cliente: FormGroup;
  
  dataCliente: any;
  
  constructor(
    
    public dialog: MatDialog,
    
    private _formBuilder: FormBuilder,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef: MatDialogRef < AlertaModalComponent >
    
    ) 
    
    {}
    
    myControl = new FormControl();

    filteredOptions: Observable<any>;

    private _filter(value: any): any {

      const filterValue = value.toLowerCase();
  
      return this.dataCliente.filter(option => option.nombre_contacto.toLowerCase().includes(filterValue));
      
    }

    
    ngOnInit() {
        
      this.dataTipo = this.data.tipo

      console.log(this.data?.cliente)
        
      if(this.data?.cliente )
      
      {
          
        this.dataCliente = this.data?.cliente

        this.filteredOptions = this.myControl.valueChanges.pipe(
         
          startWith(''),
         
          map(value => this._filter(value)),
       
          );
          
        this.cliente = this._formBuilder.group({

            clientSelect: ['', Validators.required],

          }
        );
      }
        
      if(this.data?.item?.error?.error)
      
      {
            
        this.error = this.data.item.error.error
            
        this.dataError =  this.error.split('.')
            
        this.detallado = this.dataError[2].split(',')
            
        this.errorOrigen = this.data.item.error.origen
            
        console.log('splice',this.detallado)
        
      }
    
    }

    saveClient()
    
    {
      
      const cliente = this.myControl.value;

      let idCliente = cliente.split('-')
      
      console.log(idCliente)
      
      this.close(idCliente[0])
    
    }
    
    close(data = null)
    
    {
        
      this.dialogRef.close(data)
    
    }

}

