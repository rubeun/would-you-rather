export const RECEIVE_USERS = 'RECEIVE_USERS';

// ### ACTION CREATORS ###
// return users
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}