export const loadState = () =>{
    try {
        const serialisedState = localStorage.getItem('socialtext-state');
        if (serialisedState === null){
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (error) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('socialtext-state', serializedState)
    } catch (error) {

    }
}

export const getAuthorRequestsFromLS = (id) => JSON.parse(localStorage.getItem(`requestsOf:${id}`));
export const getAuthorMessagesFromLS = (id) => JSON.parse(localStorage.getItem(`messagesOf:${id}`));

export const setAuthorRequestsToLS = (id, array) => localStorage.setItem(`requestsOf:${id}`, JSON.stringify(array));
export const setAuthorMessagesToLS = (id, array) => localStorage.setItem(`messagesOf:${id}`, JSON.stringify(array));