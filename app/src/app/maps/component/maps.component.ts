import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';

// Map Assets
import { SharedService } from 'spa-personal-shared-service';
import { MapsService } from '../services/maps.service';
import { BaseFeatureLayer } from '../interfaces/feature-layer.interface';
import { BaseMap } from '../interfaces/base-map.interface';
import Map from "@arcgis/core/Map";
import Basemap from "@arcgis/core/Basemap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Fullscreen from "@arcgis/core/widgets/Fullscreen";
import Legend from "@arcgis/core/widgets/Legend";
import LayerList from "@arcgis/core/widgets/LayerList";
import { setLocale } from "@arcgis/core/intl";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {

    public currentTheme!: string;

    #view!: MapView;
    #baseMap!: BaseMap;
    #featureLayerParcel!: BaseFeatureLayer;
    #featureLayerAddresses!: BaseFeatureLayer;
    #featureLayerZoning!: BaseFeatureLayer;

    @ViewChild('map') map!: ElementRef;

    constructor(private mapService: MapsService) {
        // Inits Module Federation Shared Service
        new SharedService(window);
    }

    ngAfterViewInit(): void {
        // Load Map
        this._registerListeners();
    }

    private _registerListeners() {
        // Listen to global theme observable
        console.log(window.__SharedService__.classes?.Observables);
        (window.__SharedService__.classes?.Observables.get('theme') as BehaviorSubject<string>)
            .subscribe((theme) => {
                console.log("DEBUG: Child application received theme change:", theme);
                this.currentTheme = theme;
            });

        // Listen to Data Service
        zip(
            this.mapService.baseMap,
            this.mapService.featureLayerParcel,
            this.mapService.featureLayerAddresses,
            this.mapService.featureLayerZoning
        ).subscribe(([baseMap, featureLayerParcel, featureLayerAddresses, featureLayerZoning]) => {
            this.#baseMap = baseMap;
            this.#featureLayerParcel = featureLayerParcel;
            this.#featureLayerAddresses = featureLayerAddresses;
            this.#featureLayerZoning = featureLayerZoning;
            this._loadMap();
            this._setLocale("en-US");
        })
    }

    private _setLocale = setLocale;

    private _loadMap() {
        // Init
        const basemap = new Basemap(this.#baseMap);
        const parcel_feature = new FeatureLayer(this.#featureLayerParcel as any);
        const site_address_feature = new FeatureLayer(this.#featureLayerAddresses as any);
        const zoning_feature = new FeatureLayer(this.#featureLayerZoning as any);

        // Generate Map
        const map = new Map({
            basemap: basemap,
            layers: [ parcel_feature, zoning_feature, site_address_feature ]
        });

        // Generate View
        this.#view = new MapView({
            map: map,
            center: [-81.27152091122406, 28.813592973393817], // Longitude, latitude
            zoom: 14, // Zoom level
            container: this.map.nativeElement, // ElementRef
            constraints: {
                rotationEnabled: false,
            }
        });

        // Generate Full Screen Button
        const fullscreen = new Fullscreen({
            view: this.#view
        });

        // Register Full Screen Button
        this.#view.ui.add(fullscreen, "top-right");

        // Legend Handler
        const legend = new Legend({
            view: this.#view,
            layerInfos: [
                {
                    layer: zoning_feature
                },
            ],
        });

        // Register Legend
        this.#view.ui.add(legend, "top-left");

        // Zoom Default Move
        this.#view.ui.move("zoom", "top-right");

        // Create Layer List
        const layerList = new LayerList({
            view: this.#view,
        });

        // Register Layer List
        this.#view.ui.add(layerList, {
            position: "top-left",
        });

        // Register Event Handlers
        this._registerEventHandlers();
    }

    private _registerEventHandlers() {
        // Event Handler 1 (Attributes for Layers)
        const eventHandlerOne = (data: any) => {
            this.#view.hitTest(data).then(function (response) {
                if (response.results.length) {
                    response.results.forEach((resp: any) => {
                        const graphic = resp.graphic;
                        const attributes = graphic.attributes;
                        console.log(attributes);
                    });
                }
            });
        }

        // Register Event Handler 1
        this.#view.on("pointer-down", eventHandlerOne);


        // Event Handler 2 (GIS Coords)
        const eventHandlerTwo = (data: any) => {
            console.log(data)
        }

        // Register Event Handler 2
        this.#view.on("click", eventHandlerTwo);
        
    }
}
