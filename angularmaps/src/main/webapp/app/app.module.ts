import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AngularmapsSharedModule, UserRouteAccessService } from './shared';
import { AngularmapsHomeModule } from './home/home.module';
import { AngularmapsAdminModule } from './admin/admin.module';
import { AngularmapsAccountModule } from './account/account.module';
import { AngularmapsEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { AgmCoreModule } from '@agm/core';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        AngularmapsSharedModule,
        AngularmapsHomeModule,
        AngularmapsAdminModule,
        AngularmapsAccountModule,
        AngularmapsEntityModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDtu4Lq8W5OXNjpEIyMNzKmI8--_80G1Z8'
        })
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class AngularmapsAppModule {}
