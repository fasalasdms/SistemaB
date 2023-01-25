import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss']
})
export class ConfirmacionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmacionModalComponent>) { }

  ngOnInit(): void {
  }

}
