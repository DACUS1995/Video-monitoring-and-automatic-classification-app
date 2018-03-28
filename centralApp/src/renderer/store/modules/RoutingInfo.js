const state = 
{
    arrInfoConfigs:
    [
        {
            route_id: 1,
            route_name: 'Clasification 1',
            route_description: 'Description 1',
            route_indication: 'Indication 1',
        },
        {
            route_id: 2,
            route_name: 'Clasification 2',
            route_description: 'Description 2',
            route_indication: 'Indication 2'
            
        }
    ]
}

const mutations = 
{
    ADD_NEW_CONFIG(state, objNewConfig)
    {
        state.arrInfoConfigs.push(objNewConfig);
    },

    EDIT_CONFIG(state, objNewConfig)
    {
        for(let index in state.arrInfoConfigs)
        {
            let objConfig = state.arrInfoConfigs[index];
            if(objConfig.route_id == objNewConfig.route_id)
            {
                // Careful when editing because if it is replaced the object entirely no update is done in renderer
                state.arrInfoConfigs[index].route_indication = objNewConfig.route_indication;
            }
        }
    },

    REMOVE_CONFIG(state, objConfig)
    {
        for(let i = 0; i <state.arrInfoConfigs.length; i++)
        {
            if(state.arrInfoConfigs[i].route_id === objConfig.route_id)
            {
			    state.arrInfoConfigs.splice(i, 1);
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