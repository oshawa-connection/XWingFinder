import chai from 'chai';
import { geoJSON } from '../types/types';
import { scramblePoints } from '../src/helperMethods/geographicFunctions'
chai.should();


const testGeoJson : geoJSON = {"type":"point","coordinates":[0,0],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}


describe("Scramble function", function() {
    it("Should create a point 100 metres away", async function() {
        
        let [newX,newY] = scramblePoints(testGeoJson)
    })
})

