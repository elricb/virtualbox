
export const setError = (error) => {
    console.log('error: ' + error);

    return {
        type: 'SET_ERROR',
        error
    };
};
