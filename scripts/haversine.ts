import { geoJSON } from "../types/types";
import { User } from "../src/models/users.model";
// https://gis.stackexchange.com/questions/25877/generating-random-locations-nearby

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

function fixedCircle(angle,centre:geoJSON) { 
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

function createCircle(instance :geoJSON)  {
    if (instance.coordinates.length !== 2 || instance.type !== "point")  throw Error("Input was not a point");
    for (let angle = 0; angle <= 1; angle+=0.01) {
        fixedCircle(angle,instance);
        
    }
}
let testGeoJSON : geoJSON = {
    type:"point",
    coordinates:[-1.7,53.85],
    crs:{}
}

scramblePoints(testGeoJSON)