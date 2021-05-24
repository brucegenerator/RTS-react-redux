const initialState = {
    searchTerms: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_SEARCH_TERMS':
            
            return {
                ...state,
                searchTerms: state.searchTerms.concat({id: new Date(),value:action.payload}),
                
            }
            
        case 'DELETE_SEARCH_TERMS':
            const updatedArray = state.searchTerms.filter((result, index) => 
                (result.id !== action.id)                
            )
            return {
                ...state,
                searchTerms: updatedArray
            }
        default:
            return state;
    }
}

export default reducer;