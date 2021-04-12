import React, { useState } from 'react';
import Footer from './Footer'
import Aside from './Aisde'
import ListTable from '../List'
import Map from '../Map'
import ClusterMap from '../ClusterMap'
import HeatMap from '../HeatMap'
import {useSelector} from 'react-redux'
import store from '../../store/store'

export default function Layout() {

  const [choice,setChoice] = useState('list');
  const ReturnComponent = ({children}) => <div> <Aside setChoice={setChoice} children={children}/> <Footer /> </div>
  
  useSelector(state => state.data);
  const data = store.getState().data;
  let geoData = [];
       if(data.length > 0)
       data.map( (sdata) => { // eslint-disable-line array-callback-return
       if(sdata.geometry !== undefined) {
        geoData.push(JSON.parse('{"type": "Feature", "geometry": {"type": "Point", "coordinates": ['+sdata.geometry.coordinates[0]+','+ sdata.geometry.coordinates[1]+']}}'));
          }
       }) 
  //console.log(geoData);
  //console.log(data)

  return(
    <div>
   { (() =>   
    {
      switch (choice) {
        case 'list':
          return (<ReturnComponent >
                       <ListTable data={data} />
                    </ReturnComponent>  )
        case 'map':
        return (<ReturnComponent >
                      <Map data={data} />
                </ReturnComponent>  )
        case 'heatmap':
          return (<ReturnComponent >
                        <HeatMap data={data} />
                  </ReturnComponent>  )
        case 'clustermap':
          return (<ReturnComponent >
                        <ClusterMap data={geoData} />
                  </ReturnComponent>  )
        default:
          return null;
     }
    })()  
  }
    </div>
  );
}