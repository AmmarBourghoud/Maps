//BASE_PATH
export const BASE_PATH = "https://data.opendatasoft.com/api/records/1.0/";

//REQUEST_GET_DATA
export const REQUEST_GET_DATA = "search/?dataset=jcdecaux_bike_data%40public&q=&lang=fr&rows=10000&facet=banking&facet=bonus&facet=status&facet=contract_name&timezone=Europe%2FBerlin";

//REQUEST_GET_SINGLE_DATA 
export const REQUEST_GET_SINGLE_DATA = (data_id) => `search/?dataset=jcdecaux_bike_data%40public&q=&refine.recordid=${data_id}`
