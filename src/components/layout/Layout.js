import React, { useState } from 'react';
import Footer from './Footer'
import Aside from './Aisde'
import ListTable from '../List'
import Map from '../Map'
import ClusterMap from '../ClusterMap'
import HeatMap from '../HeatMap'

export default function Layout() {

  const [test,setTest] = useState('');
  console.log(test)
  const ReturnComponent = ({children}) => <div> <Aside setTest={setTest} children={children}/> <Footer /> </div>
  

  return(
    <div>
   { (() =>   
    {
      switch (test) {
        case '':  
        case 'list':
          return (<ReturnComponent >
                       <ListTable />
                    </ReturnComponent>  )
        case 'map':
        return (<ReturnComponent >
                      <Map />
                </ReturnComponent>  )
        case 'heatmap':
          return (<ReturnComponent >
                        <HeatMap />
                  </ReturnComponent>  )
        case 'clustermap':
          return (<ReturnComponent >
                        <ClusterMap />
                  </ReturnComponent>  )
        default:
          return null;
     }
    })()  
  }
    </div>
  );
}