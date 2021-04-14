import SingleData from '../components/views/SingleData'

/** 
  * main application's route with path and component to render specifications * 
**/
const routes = [
  { path: '/home/:id', exact: true, name: 'Information sur un une data', component: SingleData },
];

export default routes;