// Logger Middleware to console log the action performed and resulting state
const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action is: ', action);
    const returnValue = next(action);
    console.log('The new state is: ', store.getState());
  console.groupEnd();
  return returnValue;
}

export default logger;