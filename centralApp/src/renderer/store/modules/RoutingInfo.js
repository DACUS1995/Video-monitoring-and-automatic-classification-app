const state = 
{
    arrInfoConfigs:
    [
        {
            route_id: 1,
            route_name: 'Wheelchair',
            route_description: 'People using a wheelchair',
            route_indication: 'Go Left (Wheelchair detected)',
            class_name: "tricycle",
            counter: 0
        },
        {
            route_id: 2,
            route_name: 'Walking stick',
            route_description: 'People using a walking stick',
            route_indication: 'Go Right (Walking Stick detected)',
            class_name: "walking_stick",
            counter: 0
        },
        {
            route_id: 3,
            route_name: 'Default',
            route_description: 'Ordinary people',
            route_indication: 'Go Forward',
            class_name: "default",
            counter: 0
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
                // Careful when editing because if the object is replaced entirely no update is done in renderer
                state.arrInfoConfigs[index].route_indication = objNewConfig.route_indication;
            }
        }
    },

    INCREMENT_COUNTER(state, class_name)
    {
        let objConfig = null;
        for(let index in state.arrInfoConfigs)
        {
            objConfig = state.arrInfoConfigs[index];
            if(objConfig.class_name == class_name)
            {
                // Careful when editing because if the object is replaced entirely no update is done in renderer
                state.arrInfoConfigs[index].counter++;
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