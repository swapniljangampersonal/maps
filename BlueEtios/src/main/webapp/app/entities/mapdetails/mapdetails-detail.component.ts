import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Mapdetails } from './mapdetails.model';
import { MapdetailsService } from './mapdetails.service';

@Component({
    selector: 'jhi-mapdetails-detail',
    templateUrl: './mapdetails-detail.component.html'
})
export class MapdetailsDetailComponent implements OnInit, OnDestroy {

    mapdetails: Mapdetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mapdetailsService: MapdetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMapdetails();
    }

    load(id) {
        this.mapdetailsService.find(id).subscribe((mapdetails) => {
            this.mapdetails = mapdetails;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMapdetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mapdetailsListModification',
            (response) => this.load(this.mapdetails.id)
        );
    }
}
