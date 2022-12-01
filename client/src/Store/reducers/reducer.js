
const UserData = { } ;
const AllSubjects = { };
  // All Reducers:

  function SetUser(state = UserData, action) {
    if (action.type === 'UserSet') {
        return { ...state, SelectedUser: action.payload}
      }
      else return state;
  }

  function Subjects(state = AllSubjects, action) {
    if (action.type === 'AllSubjects') {
        return { ...state, AllSubjects: action.payload}
      }
      else return state;
  }
  export {SetUser,Subjects};