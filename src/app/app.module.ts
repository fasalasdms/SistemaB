import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { MatIconModule } from '@angular/material/icon';
import { NuevaVentaComponent } from './pages/ventas/nueva-venta/nueva-venta.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FacturaComponent } from './pages/ventas/factura/factura.component';
import { editarVentaComponent } from './modals/editar-venta/editar-venta.component';
import { clienteVentaComponent } from './modals/cliente-modal/cliente-venta.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmacionModalComponent } from './modals/confirmacion-modal/confirmacion-modal.component';
import { EditarCampoComponent } from './modals/editar-campo/editar-campo.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AlertaModalComponent } from './modals/alerta-modal/alerta-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IngresoRapidoComponent } from './modals/ingresoRapido/ingresoRapido.component';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
  } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {NgxPrintModule} from 'ngx-print';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PuntosModalComponent } from './modals/puntos-modal/puntos-modal.component';
import { LotesModalComponent } from './modals/lotes-modal/lotes-modal.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};
const MY_DATE_FORMAT = {
    parse: {
      dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
      dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
  
@NgModule({
    declarations: [
        AppComponent,
        InicioComponent,
        ProductosComponent,
        editarVentaComponent,
        clienteVentaComponent,
        ConfirmacionModalComponent,
        EditarCampoComponent,
        AlertaModalComponent,
        IngresoRapidoComponent,
        PuntosModalComponent,
        LotesModalComponent,
        // FacturaComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        FormsModule,
        MatStepperModule,
        MatRadioModule,
        MatSelectModule,
        MatProgressBarModule,
        MatRippleModule,
        // MatSortModule,
        // MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,
        ReactiveFormsModule,
        MatSidenavModule,

        // Layout module of your application
        LayoutModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTableModule,
        MatChipsModule,
        FuseDrawerModule,
        MatBadgeModule,
        
        Ng2SearchPipeModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        NgxPrintModule,
        MatAutocompleteModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
      ],
    bootstrap   : [
        AppComponent,
    ]
})
export class AppModule
{
}
