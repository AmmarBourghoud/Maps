import { MAP_TOKEN } from '../../../consts/consts';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect } from 'react';
import '../../../assets/styles/Map.css'

/** 
  * HeatMap component takes geo data from parent's component as prop and adds it as source * 
  * Adds layers to display heats and circles *
**/
function HeatMap(geoData) {
  mapboxgl.accessToken = MAP_TOKEN;
  const mapContainer = useRef();
  geoData = geoData.data;
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
      center: [153.011938, -27.493963],
      zoom: 9,
      maxZoom: 12,
      minZoom: 1,
      tolerance: 3.5,
      buffer: 0,
    });
   
    map.on('load', function () {
      map.addSource('velo', {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": geoData
          }
      });
         
      map.addLayer(
        {
        id: 'velo-heat',
        type: 'heatmap',
        source: 'velo',
        maxzoom: 9,
        paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  2,
                  2,
                  8,
                  3
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  2,
                  3,
                  11,
                  5
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(33,102,172,0)',
                  0.2,
                  'rgb(103,169,207)',
                  0.4,
                  'rgb(209,229,240)',
                  0.6,
                  'rgb(253,219,199)',
                  0.8,
                  'rgb(239,138,98)',
                  1,
                  'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  2,
                  4,
                  11,
                  22
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  9,
                  3,
                  11,
                  2
            ]
            }
            },
            'waterway-label'
        );
         
    map.addLayer(
      {
        id: 'velo-point',
        type: 'circle',
        source: 'velo',
        minzoom: 7,
        paint: {
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9,
            ['interpolate', ['linear'], ['get', 'mag'], 3, 3, 8, 6],
            18,
            ['interpolate', ['linear'], ['get', 'mag'], 3, 7, 8, 52]
        ],
        // Color circle by earthquake magnitude
        'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)'
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        // Transition from heatmap to circle layer by zoom level
        'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9,
              2,
              10,
              3
        ]
        }
        },
        'waterway-label'
        );
        });
    }); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="map-container" ref={mapContainer} />
        </div>
    )
}

export default HeatMap;




