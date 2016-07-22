

### action

The only requirement of a redux action is to have a type.  payload (generally used name) contains the data for the action.

<pre><code>
{
    type: 'SOME_VALUE',
    payload: {}
}
</code></pre>

### dispatcher

the dispatcher simply dispatches the action from a component or wrapper

<pre><code>
store.dispatch(action)
</code></pre>


### reducer

The reducer takes the current state, mutates it according to the action.type and returns it.

<pre><code>
const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_EVENT:
            return [action.payload, ...state];
    }
    return state;
}
</code></pre>


### subscribe



<pre><code>
store.subscribe (() => {
    let currentState = store.getState();
})
</code></pre>
