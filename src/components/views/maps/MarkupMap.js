import { MAP_TOKEN } from '../../../consts/consts';
import mapboxgl from 'mapbox-gl';
import React, { useState, useRef, useEffect } from 'react';
import '../../../assets/styles/Map.css'
import Moment from 'moment';
import store from '../../../store/store'

function MarkupMap() {
    mapboxgl.accessToken = MAP_TOKEN;
    const mapContainer = useRef();
    const [lng, setLng] = useState(153.011938);
    const [lat, setLat] = useState(-27.493963);
    const [zoom, setZoom] = useState(9);
    const dataToDisplay = store.getState().data;
    const result = []
    for(let i=0; i< 2500;i++){
      result.push(dataToDisplay[i]);
    }
    
  useEffect(() => {
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 12,
      minZoom: 1,
      tolerance: 3.5,
      buffer: 0,

      });
    
    if(result.length > 0)
    result.map( (sdata) => { // eslint-disable-line array-callback-return
       if(sdata.geometry !== undefined) {
         new mapboxgl.Marker().setLngLat(sdata.geometry.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
         .setHTML("<p><strong> Name </strong><p>"+ sdata.fields.name + "</p><p><strong> Address </strong><p>"+ 
         sdata.fields.address + "</p><p><strong> Last Update </strong><p>" + Moment(sdata.fields.last_update).format('DD/MM/YY à HH:mm') +
                   "</p>")).addTo(map);
        }
       })         

    // map.on('move', () => {
    //     setLng(map.getCenter().lng.toFixed(4));
    //     setLat(map.getCenter().lat.toFixed(4));
    //     setZoom(map.getZoom().toFixed(2));
    //   });
    
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

export default MarkupMap;

/* MAP WITH IMAGE CHOOSED MARKUPS FOR SPEED CONCERNS */

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
    //           "type": "FeatureCollection",
    //           "features": data
    //           },
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
            
    //         map.on('click', sdata.recordid, function (e) {
    //             var coordinates = e.features[0].geometry.coordinates.slice();
    //             while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //             }
    //             new mapboxgl.Popup()
    //             .setLngLat(coordinates)
    //             .setHTML("<p><strong> Name </strong><p>"+ sdata.fields.name + "</p><p><strong> Address </strong><p>"+ 
    //             sdata.fields.address + "</p><p><strong> Last Update </strong><p>" + Moment(sdata.fields.last_update).format('DD/MM/YY à HH:mm') +
    //                       "</p>")
    //             .addTo(map);
    //           });  
       
    //       }
    //    })  
    //     }
    //   );
    //   }); 