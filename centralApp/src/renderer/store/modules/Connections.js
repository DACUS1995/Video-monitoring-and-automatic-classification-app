const state = 
{
	arrConnections: 
	[
		// Example:
		// {
		// 	label: 'Name_1',
		// 	station_id: 1,
		// 	status: "connected",
		// 	remote_address: "127.0.0.1",
		// 	clicked: false,
		// 	video_id: "station_1",
		//	socket: socket
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
	},

	// TODO check why we cannot replace the element from the arrConnection with the data object.(there is no reactiivity)
	UPDATE_CONNECTION (state, data)
	{
		for(let i = 0; i <state.arrConnections.length; i++)
		{
			if(state.arrConnections[i].station_id === data.station_id)
			{
				state.arrConnections[i].label = data.label;
				state.arrConnections[i].status = data.status;
				state.arrConnections[i].remote_address = data.remote_address;
				state.arrConnections[i].clicked = data.clicked;
				state.arrConnections[i].socket = data.socket;

				break;
			}
		}
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
  