/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlueEtiosTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MapdetailsDetailComponent } from '../../../../../../main/webapp/app/entities/mapdetails/mapdetails-detail.component';
import { MapdetailsService } from '../../../../../../main/webapp/app/entities/mapdetails/mapdetails.service';
import { Mapdetails } from '../../../../../../main/webapp/app/entities/mapdetails/mapdetails.model';

describe('Component Tests', () => {

    describe('Mapdetails Management Detail Component', () => {
        let comp: MapdetailsDetailComponent;
        let fixture: ComponentFixture<MapdetailsDetailComponent>;
        let service: MapdetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlueEtiosTestModule],
                declarations: [MapdetailsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MapdetailsService,
                    JhiEventManager
                ]
            }).overrideTemplate(MapdetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MapdetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MapdetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mapdetails('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mapdetails).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
