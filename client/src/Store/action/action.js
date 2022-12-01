//All Actions for Reducer


function SetEmail(value) {
  return {
    type: "UserSet",
    payload: value,
  };
}

function Subjects(value) {
  return {
    type: "AllSubjects",
    payload: value,
  };
}
export {SetEmail ,Subjects}
