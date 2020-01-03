import { geoJSON } from "../types/types";

function scramblePoints(inputGeoJson:geoJSON) {
    let coordinates = inputGeoJson.coordinates;
    if (coordinates.length !== 2) throw Error("Coordinates don't look to be points.")
    
    let r = Math.floor(Math.random() * 50 + 50) / 111300;
    let u = Math.random()
    let w = r * Math.sqrt(u)
    let t = 2 * Math.PI * Math.random()
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);
    
    x = x / Math.cos(inputGeoJson.coordinates[1]);

    inputGeoJson.coordinates[0] = inputGeoJson.coordinates[0] + x;
    inputGeoJson.coordinates[1] = inputGeoJson.coordinates[1] + y;
    console.log(inputGeoJson.coordinates)
}

let testGeoJSON : geoJSON = {
    type:"point",
    coordinates:[-1.7,53.85],
    crs:{}
}

scramblePoints(testGeoJSON)