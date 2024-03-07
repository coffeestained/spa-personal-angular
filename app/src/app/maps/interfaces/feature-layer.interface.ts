
export interface BaseFeatureLayer {
    url: string;
    title: string;
    outFields: string[] | undefined;
    labelingInfo: unknown | undefined;
    popupTemplate: PopupTemplate | undefined;
}

 interface PopupTemplate {
    title: string;
    content: Content[];
}

 interface Content {
    type: string;
    fieldInfos: FieldInfo[];
    description: null | string;
    showAttachments: boolean;
    mediaInfos: any[]; 
}

 interface FieldInfo {
    fieldName: string;
    label: string;
    tooltip: string;
    visible: boolean;
    stringFieldOption: StringFieldOption;
    format?: Format;
}

type StringFieldOption = "text-box";

 interface Format {
    places?: number;
    digitSeparator?: boolean;
    dateFormat?: string;
}