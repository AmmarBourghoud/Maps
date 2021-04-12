import { MAP_TOKEN, MAP_IMAGE } from '../consts/consts';
import mapboxgl from 'mapbox-gl';
import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/Map.css'
import Moment from 'moment';

function Map(data) {
    mapboxgl.accessToken = MAP_TOKEN;
    const mapContainer = useRef();
    const [lng, setLng] = useState(153.011938);
    const [lat, setLat] = useState(-27.493963);
    const [zoom, setZoom] = useState(9);
    data = data.data;
    data.length = 1500;
    console.log('data from map', data)

  useEffect(() => {
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 12,
      minZoom: 1,
      tolerance: 3.5,
      buffer: 0,

      });
    
    if(data.length > 0)
       data.map( (sdata) => { // eslint-disable-line array-callback-return
       if(sdata.geometry !== undefined) {
         new mapboxgl.Marker().setLngLat(sdata.geometry.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
         .setHTML("<p><strong> Name </strong><p>"+ sdata.fields.name + "</p><p><strong> Address </strong><p>"+ 
         sdata.fields.address + "</p><p><strong> Last Update </strong><p>" + Moment(sdata.fields.last_update).format('DD/MM/YY à HH:mm') +
                   "</p>")).addTo(map);
        }
       })         

    map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
    
      return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="sidebar">
                 Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className="map-container" ref={mapContainer} />
        </div>
    )
}

export default Map;



// map.on('load', function () {
    //   // Load an image from an external URL.
    //   map.loadImage( MAP_IMAGE,
    //   function (error, image) {
    //   if (error) throw error;
      
    //   if(data.length > 0)
    //    data.map( (sdata) => { // eslint-disable-line array-callback-return
    //    if(sdata.fields.position !== undefined && !map.hasImage(sdata.recordid)) {
    //       // Add the image to the map style.
    //       map.addImage(sdata.recordid, image);
    //       // Add a data source containing one point feature.
    //       map.addSource(sdata.recordid, {
    //         'type': 'geojson',
    //         'data': {
    //         'type': 'FeatureCollection',
    //         'features': [
    //         {
    //         'type': 'Feature',
    //          'properties': {
    //           "description":"<strong>"+ sdata.fields.name +"</strong><p>"+
    //           sdata.fields.address + "</p> <p>Last update: "+ Moment(sdata.fields.last_update).format('DD/MM/YY à HH:mm') +
    //           "</p>"
    //         },
    //         'geometry': {
    //         'type': 'Point',
    //         'coordinates': [sdata.fields.position[0], sdata.fields.position[1]]
    //         }
    //         }
    //         ]
    //         }
    //         });
       
    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //           'id': sdata.recordid,
    //           'type': 'symbol',
    //           'source': sdata.recordid, // reference the data source
    //           'layout': {
    //           'icon-image': sdata.recordid, // reference the image
    //           'icon-size': 0.25
    //           }
    //           });
       
    //       }
    //    })  
    //     }
    //   );
    //   });
