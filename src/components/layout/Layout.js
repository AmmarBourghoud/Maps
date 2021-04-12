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
  
  const data = useSelector(state => state.data);
  console.log(store.getState())

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
                        <ClusterMap data={data} />
                  </ReturnComponent>  )
        default:
          return null;
     }
    })()  
  }
    </div>
  );
}