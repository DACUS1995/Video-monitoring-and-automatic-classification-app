const state = 
{
	arrConnections: 
	[
		// {
		// 	label: 'Name_1',
		// 	station_id: 1,
		// 	status: "connected",
		// 	remote_address: "127.0.0.1",
		// 	clicked: false,
		// 	video_id: "station_1"
		// },
		// {
		// 	label: 'Name_2',
		// 	station_id: 2,
		// 	status: 'connection pending',
		// 	remote_address: "127.0.0.1",
		// 	clicked: false,
		// 	video_id: "station_2"
		// }
	]
}
  
const mutations = 
{
	REMOVE_NEW_STATION (state, data) 
	{
		for(let i = 0; i <state.arrConnections.length; i++)
        {
          if(state.arrConnections[i].station_id === data)
          {
			state.arrConnections.splice(i, 1);
          }
        }
	},
	
	ADD_NEW_STATION (state, objConnection) 
	{
		state.arrConnections.push(objConnection);
		console.log("New Connections added in the central store: ",objConnection);
	}
}
  
const actions = 
{

}
  
export default 
{
	state,
	mutations,
	actions
}
  