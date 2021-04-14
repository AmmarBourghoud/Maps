import { MAP_TOKEN } from '../../../consts/consts';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect } from 'react';
import '../../../assets/styles/Map.css'

/** 
  * ClusterMap component takes geo data from parent's component as prop and adds it as source * 
  * Adds layers to display clusters and user's clicks interaction *
**/
function ClusterMap(geoData) {
  
  mapboxgl.accessToken = MAP_TOKEN;
  const mapContainer = useRef();
  geoData = geoData.data;
    
  useEffect(() => {
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [153.011938, -27.493963],
      zoom: 9,
      minZoom: 1,
      tolerance: 3.5,
      buffer: 0,

      });
    
    map.on('load', function () {
          // set the 'cluster' option to true. GL-JS will add the point_count property to source data.
      map.addSource('velos', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": geoData
            },
          'cluster': true,
          'clusterMaxZoom': 12, 
          'clusterRadius': 50 
       });
       
      map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'velos',
            filter: ['has', 'point_count'],
            paint: {
            'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
            ],
            'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
            ]
            }
      });
       
      map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'velos',
            filter: ['has', 'point_count'],
            layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 10
            }
      });
       
      map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'velos',
            filter: ['!', ['has', 'point_count']],
            paint: {
            'circle-color': '#11b4da',
            'circle-radius': 3,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
            }
      });
       
      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
            });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('velos').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
            if (err) return;
            
            map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
            });
            }
            );
      });
       
      map.on('mouseenter', 'clusters', function () {
          map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function () {
          map.getCanvas().style.cursor = '';
          });

      });

  })

    return (
        <div>
            <div className="map-container" ref={mapContainer} />
        </div>
    )
}

export default ClusterMap;