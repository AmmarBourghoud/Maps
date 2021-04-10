import React from 'react';

import List from '../components/List';
import Map from '../components/Map';
import HeatMap from '../components/HeatMap';
import ClusterMap from '../components/ClusterMap';

const routes = [
  { path: '/list', exact: true, name: 'Liste du dataset', component: List },
  { path: '/map', exact: true, name: 'Dataset dans une Map', component: Map },
  { path: '/heatmap', exact: true, name: 'Dataset dans une HeatMap', component: HeatMap },
  { path: '/clustermap', exact: true, name: 'Dataset dans une ClusterMap', component: ClusterMap },
];

export default routes;