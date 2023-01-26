import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ClientesComponent } from 'app/componentes/clientes/clientes.component';

const inicioRoutes: Route[] = [
    {
        path     : '',
        component: InicioComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(inicioRoutes),
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTableModule,
        MatBadgeModule,
        MatRippleModule,
        MatSnackBarModule
    ]
})
export class InicioModule
{
}