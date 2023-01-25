import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-puntos-modal',
  templateUrl: './puntos-modal.component.html',
  styleUrls: ['./puntos-modal.component.scss']
})
export class PuntosModalComponent implements OnInit {
  puntos: any;

  constructor(private _apiService:ApiService) { }

  getPuntos(){
    this._apiService.getQuery("apiUrlPuntos","RecaudoPuntos/EquivalenciaPuntos","").subscribe(async (res:any)=>{
      this.puntos = await res.result;
    });
  }

  ngOnInit(): void {
    this.getPuntos();
  }

}
