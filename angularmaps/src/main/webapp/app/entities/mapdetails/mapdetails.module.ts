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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDtu4Lq8W5OXNjpEIyMNzKmI8--_80G1Z8'
        }),
        NgxMapboxGLModule.withConfig({
            accessToken: 'pk.eyJ1Ijoic3dhcG5pbGphbmdhbSIsImEiOiJjamp4dTI3ZzYxaHF6M3Fxa3Fib3E1dWlpIn0.K0e5-mEm_G2XOHpg_YZAjw',
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
