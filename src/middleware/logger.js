export default store => next => action => {
    console.log('ACTION:', action);

    return next(action);
}
