export interface BaseMap {
    baseLayers: any[];
    title: string;
    id: string;
}

// Assuming layerType can have a limited set of values, otherwise use string
type LayerType = "ArcGISTiledMapServiceLayer" | "ArcGISTiledMapServiceLayer";