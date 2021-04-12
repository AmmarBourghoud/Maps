import { MAP_TOKEN } from '../../../consts/consts';
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect } from 'react';
import '../../../assets/styles/Map.css'

function ClusterMap(data) {
    mapboxgl.accessToken = MAP_TOKEN;
    const mapContainer = useRef();
    data = data.data;
    console.log('data from cluster map', data)

  useEffect(() => {
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [153.011938, -27.493963],
      zoom: 9,
      maxZoom: 12,
      minZoom: 1,
      tolerance: 3.5,
      buffer: 0,

      });
    
    map.on('load', function () {
          // Add a new source from our GeoJSON data and
          // set the 'cluster' option to true. GL-JS will
          // add the point_count property to your source data.
          map.addSource('velos', {
          'type': 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          'data': {
            "type": "FeatureCollection",
            "features": data
            },
          'cluster': true,
          'clusterMaxZoom': 12, // Max zoom to cluster points on
          'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)
      });
       
      map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'velos',
            filter: ['has', 'point_count'],
            paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
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