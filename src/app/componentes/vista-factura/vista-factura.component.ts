import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class VistaFacturaComponent implements OnInit {
  venta: any;
  dataFacturado: any;
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _userService: UserService) { }
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    
    this.dataFacturado = this.data.dataFactura
    
    console.log( this.dataFacturado)
    
    this.venta=this.data.venta;

    this._userService.user$
    .pipe((takeUntil(this._unsubscribeAll)))
    .subscribe((user: User) => {
        this.user = user;
    });

  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

}
