import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HistorialComponent } from './historial.component';

const historialRoutes: Route[] = [
    {
        path     : '',
        component: HistorialComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(historialRoutes)
    ]
})
export class HistorialModule
{
}