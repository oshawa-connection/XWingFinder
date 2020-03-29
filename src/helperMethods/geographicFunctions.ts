import { geoJSON,FixedLengthArray } from "../../types/types";



export function scramblePoints(inputGeoJson:geoJSON) : FixedLengthArray<[number, number]> {
    // https://gis.stackexchange.com/questions/25877/generating-random-locations-nearby
    let coordinates = inputGeoJson.coordinates;
    if (coordinates.length !== 2) throw Error("Coordinates don't look to be points.")
    
    let r = Math.floor(Math.random() * 50 + 50) / 111300;
    let u = Math.random()
    let w = r * Math.sqrt(u)
    let t = 2 * Math.PI * Math.random()
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);
    
    x = x / Math.cos(inputGeoJson.coordinates[1]);

    let newX = inputGeoJson.coordinates[0] + x;
    let newY = inputGeoJson.coordinates[1] + y;
    
    return [newX,newY]

}

export function fixedCircle(angle :number,centre:geoJSON) { 
    let r = 100;
    let u = Math.random()
    let w = r * Math.sqrt(u)
    let t = 2 * Math.PI * angle;
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);
    
    x = x / Math.cos(centre.coordinates[1]);
    centre.coordinates[0] = centre.coordinates[0] + x;
    centre.coordinates[1] = centre.coordinates[1] + y;
}

export function createCircle(instance :geoJSON)  {
    if (instance.coordinates.length !== 2 || instance.type !== "point")  throw Error("Input was not a point");
    for (let angle = 0; angle <= 1; angle+=0.01) {
        fixedCircle(angle,instance);
        
    }
}

export function toRadians(original :number) :number {
    return original * Math.PI / 180;
}


export function measureDistanceBetweenTwoPoints(lat1:number,lon1:number,lat2:number,lon2:number) :number {
    let R = 6371e3; // metres
    let Omega1 = toRadians(lat1);
    let Omega2 = toRadians(lat2);
    let deltaOmega = toRadians(lat2-lat1);
    let deltaLambda = toRadians(lon2-lon1);

    let a = Math.sin(deltaOmega/2) * Math.sin(deltaOmega/2) +
            Math.cos(Omega1) * Math.cos(Omega2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}