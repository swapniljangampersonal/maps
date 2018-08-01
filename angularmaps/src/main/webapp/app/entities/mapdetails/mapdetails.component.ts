import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularmapsSharedModule } from '../../shared';
import { AgmCoreModule } from '@agm/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import {
    MapdetailsService,
    MapdetailsPopupService,
    MapdetailsComponent,
    MapdetailsDetailComponent,
    MapdetailsDialogComponent,
    MapdetailsPopupComponent,
    MapdetailsDeletePopupComponent,
    MapdetailsDeleteDialogComponent,
    mapdetailsRoute,
    mapdetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mapdetailsRoute,
    ...mapdetailsPopupRoute,
];

@NgModule({
    imports: [
        AngularmapsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        NgxMapboxGLModule.withConfig({
            accessToken: 'NONE',
            geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
        })
    ],
    declarations: [
        MapdetailsComponent,
        MapdetailsDetailComponent,
        MapdetailsDialogComponent,
        MapdetailsDeleteDialogComponent,
        MapdetailsPopupComponent,
        MapdetailsDeletePopupComponent,
    ],
    entryComponents: [
        MapdetailsComponent,
        MapdetailsDialogComponent,
        MapdetailsPopupComponent,
        MapdetailsDeleteDialogComponent,
        MapdetailsDeletePopupComponent,
    ],
    providers: [
        MapdetailsService,
        MapdetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AngularmapsMapdetailsModule {}
