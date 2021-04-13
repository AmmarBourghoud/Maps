import React, { useState } from 'react';
import Footer from './Footer'
import Aside from './Aisde'
import ListTable from '../views/ListTable'
import MarkupMap from '../views/maps/MarkupMap'
import ClusterMap from '../views/maps/ClusterMap'
import HeatMap from '../views/maps/HeatMap'
import {useSelector} from 'react-redux'

export default function Layout() {

  const [choice,setChoice] = useState('list');
  const ReturnComponent = ({children}) => <div> <Aside setChoice={setChoice} children={children}/> <Footer /> </div>
  
  const data = useSelector(state => state.data);
  let geoData = [];
       if(data.length > 0)
       data.map( (sdata) => { // eslint-disable-line array-callback-return
       if(sdata.geometry !== undefined) {
        geoData.push(JSON.parse('{"type": "Feature", "geometry": {"type": "Point", "coordinates": ['+sdata.geometry.coordinates[0]+','+ sdata.geometry.coordinates[1]+']}}'));
          }
       }) 
       
  return(
    <div>
   { (() =>   
    {
      switch (choice) {
        case 'list':
          return (<ReturnComponent >
                       <ListTable data={data} />
                    </ReturnComponent>  )
        case 'markupsmap':
        return (<ReturnComponent >
                      <MarkupMap />
                </ReturnComponent>  )
        case 'heatmap':
          return (<ReturnComponent >
                        <HeatMap data={geoData} />
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