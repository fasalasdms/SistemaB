import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatSidenavModule } from '@angular/material/sidenav';

const productosRoutes: Route[] = [
    {
        path     : '',
        component: ProductosComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(productosRoutes),
        FuseDrawerModule,
        MatSidenavModule
        
    ]
})
export class ProductosModule
{
}