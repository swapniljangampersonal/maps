import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MapdetailsComponent } from './mapdetails.component';
import { MapdetailsDetailComponent } from './mapdetails-detail.component';
import { MapdetailsPopupComponent } from './mapdetails-dialog.component';
import { MapdetailsDeletePopupComponent } from './mapdetails-delete-dialog.component';

import { Principal } from '../../shared';

export const mapdetailsRoute: Routes = [
    {
        path: 'mapdetails',
        component: MapdetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mapdetails'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mapdetails/:id',
        component: MapdetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mapdetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mapdetailsPopupRoute: Routes = [
    {
        path: 'mapdetails-new',
        component: MapdetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mapdetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mapdetails/:id/edit',
        component: MapdetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mapdetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mapdetails/:id/delete',
        component: MapdetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mapdetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
