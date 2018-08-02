import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mapdetails } from './mapdetails.model';
import { MapdetailsPopupService } from './mapdetails-popup.service';
import { MapdetailsService } from './mapdetails.service';

@Component({
    selector: 'jhi-mapdetails-delete-dialog',
    templateUrl: './mapdetails-delete-dialog.component.html'
})
export class MapdetailsDeleteDialogComponent {

    mapdetails: Mapdetails;

    constructor(
        private mapdetailsService: MapdetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.mapdetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mapdetailsListModification',
                content: 'Deleted an mapdetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mapdetails-delete-popup',
    template: ''
})
export class MapdetailsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mapdetailsPopupService: MapdetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.mapdetailsPopupService
                .open(MapdetailsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
