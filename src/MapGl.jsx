import React, { PureComponent } from "react";
import { DeckGL } from "deck.gl";
import {PathLayer } from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers'

import { Map } from 'react-map-gl'
import { MAP } from './config'

class MapGl extends PureComponent {
    state = {
        initialState: {
            longitude: 90.389516, 
            latitude: 23.821202, 
            zoom: 12
        },
        layers: ''
    }

    componentDidMount(){

        //
        const pathLayerData = [
            {
                path: [[90.389516, 23.821202], [90.389337, 23.820067], [90.393487, 23.822466], [90.394992, 23.819637], [ 90.394800, 23.819468]],
                name: 'ECB',
                color: [255, 0, 0]
            },
        ]

        const tripLayerData =  [
            {
              waypoints: [
                {
                  coordinates: [90.389516, 23.821202],
                  timestamp: 1554772579000
                },
                {
                  coordinates: [90.389337, 23.820067],
                  timestamp: 1554772579009
                },
                {
                  coordinates: [90.393487, 23.822466],
                  timestamp: 1554772579054
                },
                {
                  coordinates: [90.394992, 23.819637],
                  timestamp: 1554772579092
                },
                {
                  coordinates: [ 90.394800, 23.819468],
                  timestamp: 1554772579345
                },
              ]
            }
          ]

const tripLayer = new TripsLayer({
  id: 'TripsLayer',
  data: tripLayerData,
  
  /* props from TripsLayer class */
  
  currentTime: 500,
  // fadeTrail: true,
  getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
  trailLength: 600,
  
  /* props inherited from PathLayer class */
  
  // billboard: false,
  capRounded: true,
  getColor: [253, 128, 103],
  getPath: d => d.waypoints.map(p => p.coordinates),
  // getWidth: 1,
  jointRounded: true,
  // miterLimit: 4,
  // rounded: true,
  // widthMaxPixels: Number.MAX_SAFE_INTEGER,
  widthMinPixels: 8,
  // widthScale: 1,
  // widthUnits: 'meters',
  
  /* props inherited from Layer class */
  
  // autoHighlight: false,
  // coordinateOrigin: [0, 0, 0],
  // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
  // highlightColor: [0, 0, 128, 128],
  // modelMatrix: null,
  opacity: 0.8,
  // pickable: false,
  // visible: true,
  // wrapLongitude: false,
});
           
        

        const pathLayer = new PathLayer({
            id: 'path-layer',
            data: pathLayerData,
            pickable: true,
            widthScale: 0,
            widthMinPixels: 2,
            getPath: d => d.path,
            // getColor: d => colorToRGBArray(d.color),
            getWidth: d => 5
        })
        // const tripLayer = new TripsLayer({
        //     id: 'trips-layer',
        //     data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.trips.json',
        //     getPath: d => d.waypoints.map(p => p.coordinates),
        //     // deduct start timestamp from each data point to avoid overflow
        //     getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
        //     getColor: [253, 128, 93],
        //     opacity: 0.8,
        //     widthMinPixels: 5,
        //     rounded: true,
        //     fadeTrail: true,
        //     trailLength: 200,
        //     currentTime: 100
        //   });

        this.setState({
            layers: [tripLayer, pathLayer]
        })
    }
   
   
   
    render(){
        const { initialState, layers } = this.state

        return (
          <DeckGL
                initialViewState={initialState}
                controller={true}
                layers={layers}
          >
            <Map 
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" 
                // mapStyle={ MAP.STYLE } 
                mapboxAccessToken={ process.env.REACT_APP_MAPBOX_API_KEY }
            />

                
          </DeckGL>
        )
    }
}

export default MapGl;
