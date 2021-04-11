import React, { useState } from 'react';
import Footer from './Footer'
import Aside from './Aisde'
import ListTable from '../List'
import Map from '../Map'
import ClusterMap from '../ClusterMap'
import HeatMap from '../HeatMap'
import * as dataActions from '../../store/data/actions'
import {useDispatch, useSelector} from 'react-redux'

export default function Layout() {

  const dispatch = useDispatch() 
  const [choice,setChoice] = useState('');
  const ReturnComponent = ({children}) => <div> <Aside setChoice={setChoice} children={children}/> <Footer /> </div>
  
  function getData() {
    dispatch(dataActions.getData());
  }
  getData();

  const data = useSelector(state => state);
  console.log("data State",data);

  return(
    <div>
   { (() =>   
    {
      switch (choice) {
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