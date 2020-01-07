export type modelInterface<T> = {
    [P in keyof T]?: T[P];
}


interface crs {
    type : "string",
    properties : object
}

export interface geoJSON {
    coordinates : Array<any>,
    "type" : "point"| "polygon",
    crs: object
}