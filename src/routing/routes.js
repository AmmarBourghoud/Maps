import React from 'react';

import List from '../components/views/List';
import MarkupMap from '../components/views/maps/MarkupMap';
import HeatMap from '../components/views/maps/HeatMap';
import ClusterMap from '../components/views/maps/ClusterMap';

const routes = [
  { path: '/list', exact: true, name: 'Liste du dataset', component: List },
  { path: '/map', exact: true, name: 'Dataset dans une Map', component: MarkupMap },
  { path: '/heatmap', exact: true, name: 'Dataset dans une HeatMap', component: HeatMap },
  { path: '/clustermap', exact: true, name: 'Dataset dans une ClusterMap', component: ClusterMap },
];

export default routes;