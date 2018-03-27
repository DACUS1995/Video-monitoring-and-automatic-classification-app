const state = 
{
    arrInfoConfigs:
    [
        {
            route_id: 1,
            route: "Insert route",
            name: 'Clasification 1',
            content: 'Description 1'
        },
        {
            route_id: 2,
            route: "Insert route",				 
            name: 'Clasification 2',
            content: 'Description 2'
        }
    ]
}

const mutations = 
{
    ADD_NEW_CONFIG(state, objNewConfig)
    {
        state.arrInfoConfigs.push(objNewConfig);
    },

    EDIT_NEW_CONFIG(state, objNewConfig)
    {
        for(let objConfig of state.arrInfoConfigs)
        {
            if(objConfig.route_id == objNewConfig.route_id)
            {
                objConfig = objNewConfig;
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