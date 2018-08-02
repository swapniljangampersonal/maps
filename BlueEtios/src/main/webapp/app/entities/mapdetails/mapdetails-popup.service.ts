import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mapdetails } from './mapdetails.model';
import { MapdetailsService } from './mapdetails.service';

@Injectable()
export class MapdetailsPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private mapdetailsService: MapdetailsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.mapdetailsService.find(id).subscribe((mapdetails) => {
                this.mapdetailsModalRef(component, mapdetails);
            });
        } else {
            return this.mapdetailsModalRef(component, new Mapdetails());
        }
    }

    mapdetailsModalRef(component: Component, mapdetails: Mapdetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mapdetails = mapdetails;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
