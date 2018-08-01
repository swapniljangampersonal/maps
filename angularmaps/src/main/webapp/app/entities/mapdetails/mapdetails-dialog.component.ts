import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mapdetails } from './mapdetails.model';
import { MapdetailsPopupService } from './mapdetails-popup.service';
import { MapdetailsService } from './mapdetails.service';

@Component({
    selector: 'jhi-mapdetails-dialog',
    templateUrl: './mapdetails-dialog.component.html'
})
export class MapdetailsDialogComponent implements OnInit {

    mapdetails: Mapdetails;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private mapdetailsService: MapdetailsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mapdetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mapdetailsService.update(this.mapdetails));
        } else {
            this.subscribeToSaveResponse(
                this.mapdetailsService.create(this.mapdetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<Mapdetails>) {
        result.subscribe((res: Mapdetails) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Mapdetails) {
        this.eventManager.broadcast({ name: 'mapdetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-mapdetails-popup',
    template: ''
})
export class MapdetailsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mapdetailsPopupService: MapdetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.mapdetailsPopupService
                    .open(MapdetailsDialogComponent, params['id']);
            } else {
                this.modalRef = this.mapdetailsPopupService
                    .open(MapdetailsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
