import React, { useRef,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import store from '../../store/store';
import {getSingleData} from '../../store/data/actions'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { MAP_TOKEN } from '../../consts/consts'; 
import mapboxgl from 'mapbox-gl';
import '../../assets/styles/Map.css';

const useStyles = makeStyles({
    root: {
        width: '28%',
        marginLeft: '3%',
        marginTop: '3%',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        border: 'solid 1px lightgrey',
    },
    header: {
        border: 'solid 1px lightgrey',
        borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
        borderTopColor: 'darkgray',
        borderTopWidth: 2,
        fontSize: 20,
    },
    fields: {
      fontSize: 15,
      fontWeight: 600  
    },
    value: {
      marginBottom: 12,
      fontSize: 12,
      fontFamily: 'system-ui',
      color: 'black'
    },  
});

export default function SingleData() {

const classes = useStyles();
const dispatch = useDispatch()
let { id } = useParams();
mapboxgl.accessToken = MAP_TOKEN;
const mapContainer = useRef();
let singleData = useSelector(state => state.singleData);
console.log(singleData);
let coordinates = []
if(singleData.length > 0) {
    coordinates.push(singleData[0].geometry.coordinates[0]);
    coordinates.push(singleData[0].geometry.coordinates[1]);
    console.log(coordinates)
}

useEffect(() => {
    dispatch(getSingleData(store.dispatch,id)); 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
useEffect(() => {
    let c = [-1.5675018425,47.225470627]
    const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
    center: [c[0], c[1]],
    zoom: 10,
    maxZoom: 12,
    minZoom: 9,
    tolerance: 3.5,
    buffer: 0,

    });
    if(coordinates.length > 0) {
     map.setCenter([coordinates[0],coordinates[1]]);
  
     new mapboxgl.Marker().setLngLat([coordinates[0],coordinates[1]]).addTo(map);
    }
  
    return () => map.remove();
  }, [singleData]); // eslint-disable-line react-hooks/exhaustive-deps

const columns = [
    { field: 'number', headerName: 'Number', width: 110 },
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'address', headerName: 'Address', width: 350 },
    { field: 'position', headerName: 'Position', width: 270 },
    { field: 'banking', headerName: 'Banking', width: 110 },
    { field: 'bonus', headerName: 'Bonus', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'available_bike_stands', headerName: 'Available Bike Stands', width: 100 },
    { field: 'available_bikes', headerName: 'Available Bikes', width: 100 },
    { field: 'last_update', headerName: 'Last Update', width: 100 },
    { field: 'bike_stands', headerName: 'Bike Stands', width: 100 },
    { field: 'contract_name', headerName: 'Contract Name', width: 100 },
  ];
  
  function createData(id, number, name, address, position, banking, bonus, status, available_bike_stands, available_bikes, last_update, bike_stands, contract_name) {
    return { id, number, name, address, position, banking, bonus, status, available_bike_stands, available_bikes, last_update, bike_stands, contract_name };
  }
  
    let rows = [];
    if(singleData.length > 0)
    singleData.map( (sdata) =>
      rows.push(createData(sdata.recordid, sdata.fields.number, sdata.fields.name, sdata.fields.address, sdata.fields.position, sdata.fields.banking, sdata.fields.bonus, sdata.fields.status, sdata.fields.available_bike_stands, sdata.fields.available_bikes, sdata.fields.last_update, sdata.fields.bike_stands, sdata.fields.contract_name) ),
    )

    const CardData = () => {
        return (
            <Card className={classes.root}>
              <CardHeader title="Data Details" className={classes.header}>
              </CardHeader>
                <CardContent>
                {rows.map((row,index) => {   
                 return (    
                    <div key={index}>  
                 {columns.map((column) => {
                    const value = row[column.field];
                    return (
                        <div style={{marginBottom: '4%'}} key={column.field}>
                        <Typography className={classes.fields} key={column.headerName}>
                                {column.headerName}
                        </Typography>
                        <Typography className={classes.value} color="textSecondary" key={value}>
                                    {value}
                        </Typography>    
                        </div>
                    );
                  })} 
                   </div>
                 );   
                })}
               </CardContent>
            </Card>
          );
        }

return (
    <div>
   <CardData />
         
         <div className="singleData-map-container" ref={mapContainer} />
         </div>
  );
}
