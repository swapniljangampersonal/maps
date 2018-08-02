import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
    JhiEventManager,
    JhiParseLinks,
    JhiPaginationUtil,
    JhiAlertService
} from 'ng-jhipster';

import { Mapdetails } from './mapdetails.model';
import { MapdetailsService } from './mapdetails.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LngLatBounds } from 'mapbox-gl';

@Component({
    selector: 'jhi-mapdetails',
    templateUrl: './mapdetails.component.html',
    styleUrls: ['mapdetails.scss']
})
export class MapdetailsComponent implements OnInit, OnDestroy {
    mapdetails: Mapdetails[];
    currentAccount: any;
    eventSubscriber: Subscription;
    showMapDetails: boolean;
    bounds: LngLatBounds;
    modalReference: any;
    modalTitle: string;
    modalData: string;
    imageLoaded: boolean;
    maplocations: any;
    model: any;
    recentlyViewed: any = [];
    @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef;

    style = {
        'version': 8,
        'sources': {
          'countries': {
            'type': 'vector',
            // 'url': 'mapbox://map-id'
            // 'url': 'http://tileserver.com/layer.json',
            'tiles': ['http://localhost:8081/countries/{z}/{x}/{y}.pbf'],
            'maxzoom': 6
          }
        },
        'glyphs': 'http://localhost:8081/font/{fontstack}/{range}.pbf',
        'layers': [{
          'id': 'background',
          'type': 'background',
          'paint': {
            'background-color': '#ddeeff'
          }
        }, {
          'id': 'country-glow-outer',
          'type': 'line',
          'source': 'countries',
          'source-layer': 'country',
          'layout': {
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#226688',
            'line-width': 5,
            'line-opacity': {
              'stops': [[0, 0], [1, 0.1]]
            }
          }
        }, {
          'id': 'country-glow-inner',
          'type': 'line',
          'source': 'countries',
          'source-layer': 'country',
          'layout': {
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#226688',
            'line-width': {
              'stops': [[0, 1.2], [1, 1.6], [2, 2], [3, 2.4]]
            },
            'line-opacity': 0.8,
          }
        // rainbow start
        }, {
          'id': 'area-white',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'ATA'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#F0F8FF'
            }
        }, {
          'id': 'area-red',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'AFG', 'ALD', 'BEN', 'BLR',
          'BWA', 'COK', 'COL', 'DNK', 'DOM', 'ERI', 'FIN', 'FRA', 'FRO',
          'GIB', 'GNB', 'GNQ', 'GRC', 'GTM', 'JPN', 'KIR', 'LKA', 'MHL', 'MMR', 'MWI', 'NCL', 'OMN', 'RWA', 'SMR', 'SVK', 'SYR', 'TCD', 'TON', 'URY', 'WLF'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#fdaf6b'
          }
        }, {
          'id': 'area-orange',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'AZE', 'BGD', 'CHL', 'CMR',
           'CSI', 'DEU', 'DJI', 'GUY', 'HUN', 'IOA', 'JAM', 'LBN', 'LBY', 'LSO', 'MDG', 'MKD', 'MNG', 'MRT', 'NIU', 'NZL', 'PCN', 'PYF', 'SAU',
           'SHN', 'STP', 'TTO', 'UGA', 'UZB', 'ZMB'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#fdc663'
          }
        }, {
          'id': 'area-yellow',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'AGO', 'ASM',
          'ATF', 'BDI', 'BFA', 'BGR', 'BLZ', 'BRA', 'CHN',
          'CRI', 'ESP', 'HKG', 'HRV', 'IDN', 'IRN', 'ISR', 'KNA', 'LBR', 'LCA', 'MAC', 'MUS', 'NOR', 'PLW', 'POL', 'PRI', 'SDN', 'TUN', 'UMI', 'USA', 'USG', 'VIR', 'VUT'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#fae364'
          }
        }, {
          'id': 'area-green',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'ARE', 'ARG', 'BHS', 'CIV', 'CLP', 'DMA', 'ETH', 'GAB', 'GRD', 'GRL', 'HMD', 'IND', 'IOT', 'IRL', 'IRQ', 'ITA', 'KOS',
            'LUX', 'MEX', 'NAM', 'NER', 'PHL', 'PRT', 'RUS', 'SEN', 'SUR', 'TZA', 'VAT'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#d3e46f'
          }
        }, {
          'id': 'area-turquoise',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'AUT', 'BEL', 'BHR', 'BMU', 'BRB', 'CYN', 'DZA', 'EST',
           'FLK', 'GMB', 'GUM', 'HND', 'JEY', 'KGZ', 'LIE', 'MAF', 'MDA', 'NGA', 'NRU', 'SLB', 'SOL', 'SRB', 'SWZ', 'THA', 'TUR', 'VEN', 'VGB'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#aadb78'
          }
        }, {
          'id': 'area-blue',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'AIA', 'BIH', 'BLM', 'BRN', 'CAF',
           'CHE', 'COM', 'CPV', 'CUB', 'ECU', 'ESB', 'FSM', 'GAZ', 'GBR', 'GEO', 'KEN', 'LTU', 'MAR', 'MCO', 'MDV', 'NFK', 'NPL', 'PNG', 'PRY', 'QAT',
           'SLE', 'SPM', 'SYC', 'TCA', 'TKM', 'TLS', 'VNM', 'WEB', 'WSB', 'YEM', 'ZWE'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#a3cec5'
          }
        }, {
          'id': 'area-purple',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'ABW', 'ALB', 'AND', 'ATC', 'BOL',
           'COD', 'CUW', 'CYM', 'CYP', 'EGY', 'FJI', 'GGY', 'IMN', 'KAB', 'KAZ', 'KWT', 'LAO', 'MLI', 'MNP', 'MSR', 'MYS',
           'NIC', 'NLD', 'PAK', 'PAN', 'PRK', 'ROU', 'SGS', 'SVN', 'SWE', 'TGO', 'TWN', 'VCT', 'ZAF'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#ceb5cf'
          }
        }, {
          'id': 'area-pink',
          'type': 'fill',
          'source': 'countries',
          'filter': ['in', 'ADM0_A3', 'ARM', 'ATG', 'AUS', 'BTN', 'CAN', 'COG', 'CZE', 'GHA', 'GIN', 'HTI', 'ISL', 'JOR', 'KHM',
          'KOR', 'LVA', 'MLT', 'MNE', 'MOZ', 'PER', 'SAH', 'SGP', 'SLV', 'SOM', 'TJK', 'TUV', 'UKR', 'WSM'],
          'source-layer': 'country',
          'paint': {
            'fill-color': '#f3c1d3'
          }
        // rainbow end
        }, {
          'id': 'geo-lines',
          'type': 'line',
          'source': 'countries',
          'source-layer': 'geo-lines',
          'paint': {
            'line-color': '#226688',
            'line-width': {
              'stops': [[0, 0.2], [4, 1]]
            },
            'line-dasharray': [6, 2]
          }
        }, {
          'id': 'land-border-country',
          'type': 'line',
          'source': 'countries',
          'source-layer': 'land-border-country',
          'paint': {
            'line-color': '#fff',
            'line-width': {
              'base': 1.5,
              'stops': [[0, 0], [1, 0.8] , [2, 1]]
            }
          }
        }, {
          'id': 'state',
          'type': 'line',
          'source': 'countries',
          'source-layer': 'state',
          'minzoom': 3,
          'filter': ['in', 'ADM0_A3', 'USA', 'CAN', 'AUS'],
          'paint': {
            'line-color': '#226688',
            'line-opacity': 0.25,
            'line-dasharray': [6, 2, 2, 2],
            'line-width': 1.2
          }
        // LABELS
        }, {
          'id': 'country-abbrev',
          'type': 'symbol',
          'source': 'countries',
          'source-layer': 'country-name',
          'minzoom': 1.8,
          'maxzoom': 3,
          'layout': {
            'text-field': '{ABBREV}',
            'text-font': ['Open Sans Semibold'],
            'text-transform': 'uppercase',
            'text-max-width': 20,
            'text-size': {
              'stops': [[3, 10], [4, 11], [5, 12], [6, 16]]
            },
            'text-letter-spacing': {
              'stops': [[4, 0], [5, 1], [6, 2]]
            },
            'text-line-height': {
              'stops': [[5, 1.2], [6, 2]]
            }
          },
          'paint': {
            'text-halo-color': '#fff',
            'text-halo-width': 1.5
          }
        }, {
          'id': 'country-name',
          'type': 'symbol',
          'source': 'countries',
          'source-layer': 'country-name',
          'minzoom': 3,
          'layout': {
            'text-field': '{NAME}',
            'text-font': ['Open Sans Semibold'],
            'text-transform': 'uppercase',
            'text-max-width': 20,
            'text-size': {
              'stops': [[3, 10], [4, 11], [5, 12], [6, 16]]
            }
          },
          'paint': {
            'text-halo-color': '#fff',
            'text-halo-width': 1.5
          }
        }, {
          'id': 'geo-lines-lables',
          'type': 'symbol',
          'source': 'countries',
          'source-layer': 'geo-lines',
          'minzoom': 1,
          'layout': {
            'text-field': '{DISPLAY}',
            'text-font': ['Open Sans Semibold'],
            'text-offset': [0, 1],
            'symbol-placement': 'line',
            'symbol-spacing': 600,
            'text-size': 9
          },
          'paint': {
            'text-color': '#226688',
            'text-halo-width': 1.5
          }
        }]
      };

    constructor(
        private mapdetailsService: MapdetailsService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private modalService: NgbModal
    ) {}

    loadAll() {
        this.mapdetailsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mapdetails = res.json;
                this.zoomToBounds();
                if (localStorage.getItem('recentlyViewed')) {
                    this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'));
                }
                this.maplocations = this.mapdetails.map((a) => a.label);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMapdetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Mapdetails) {
        return item.id;
    }
    registerChangeInMapdetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mapdetailsListModification',
            (response) => this.loadAll()
        );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    checkClicked(val) {
        if (val) {
            this.showMapDetails = false;
        } else {
            this.showMapDetails = true;
        }
    }

    convertFloat(val) {
        return parseFloat(val);
    }

    zoomToBounds() {
        const coords = [];
        const latArray = this.mapdetails.map((a) => this.convertFloat(a.latitude));
        for ( let i = 0; i < this.mapdetails.length; i++) {
            let latitude = 0;
            if (this.isMinLatitude(this.convertFloat(this.mapdetails[i].latitude), latArray)) {
                latitude = this.convertFloat(this.mapdetails[i].latitude) - 2;
            } else if (this.isMaxLatitude(this.convertFloat(this.mapdetails[i].latitude), latArray)) {
                latitude = this.convertFloat(this.mapdetails[i].latitude) + 2;
            } else {
                latitude = this.convertFloat(this.mapdetails[i].latitude);
            }
            coords.push([this.convertFloat(this.mapdetails[i].longitude), latitude]);
        }
        const coordinates = coords;
        this.bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(<any>coord);
        }, new LngLatBounds(coordinates[0], coordinates[0]));
      }

      isMinLatitude(val, latArray) {
        return val === Math.min(... latArray);
      }

      isMaxLatitude(val, latArray) {
        return val === Math.max(... latArray);
      }

    openVerticallyCentered(content, mapdetails) {
        this.modalReference = this.modalService.open(content);
        this.modalTitle = mapdetails.label;
        this.modalData = mapdetails.incompliances;
        this.addToRecentlyViewed(mapdetails);
    }

    search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => this.maplocations.filter((v) => v.toLowerCase().indexOf(term.toString().toLowerCase()) > -1).slice(0, 10))
    );

    addToRecentlyViewed(mapdetails) {
        if (!this.checkIfRecentCityExists(mapdetails)) {
            this.recentlyViewed.push(mapdetails);
            localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
        }
    }

    checkIfRecentCityExists(mapdetails) {
        for (let i = 0; i < this.recentlyViewed.length; i++) {
            if (JSON.stringify(mapdetails) === JSON.stringify(this.recentlyViewed[i])) {
                return true;
            }
        }
        return false;
    }
    zoomToSelectedCity(val) {
        let latitude = 0;
        let longitude = 0;
        const coordinates = [];
        const selectedCities = [];
        let latArray = [];
        for (let i = 0; i < this.mapdetails.length; i++) {
            if (this.mapdetails[i].label === val) {
                latitude = this.convertFloat(this.mapdetails[i].latitude);
                longitude = this.convertFloat(this.mapdetails[i].longitude);
                this.addToRecentlyViewed(this.mapdetails[i]);
                selectedCities.push(this.mapdetails[i]);
                // coordinates.push([longitude, latitude]);
            }
        }
        if (latitude === 0 && longitude === 0) {
            alert('Location not found');
        } else {
            latArray = selectedCities.map((a) => this.convertFloat(a.latitude));
            for ( let i = 0; i < selectedCities.length; i++) {
                if (this.isMinLatitude(this.convertFloat(selectedCities[i].latitude), latArray)) {
                    latitude = this.convertFloat(selectedCities[i].latitude) - 0.2;
                } else if (this.isMaxLatitude(this.convertFloat(selectedCities[i].latitude), latArray)) {
                    latitude = this.convertFloat(selectedCities[i].latitude) + 0.2;
                } else {
                    latitude = this.convertFloat(selectedCities[i].latitude);
                }
                coordinates.push([this.convertFloat(selectedCities[i].longitude), latitude]);
            }
            this.bounds = coordinates.reduce((bounds, coord) => {
                return bounds.extend(<any>coord);
            }, new LngLatBounds(coordinates[0], coordinates[0]));
        }
    }
    zoomToSelectedCities(cityName) {

    }
    public scrollRight(): void {
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
      }
      public scrollLeft(): void {
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
      }
}
