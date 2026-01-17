// utils/taskStateMachine.js
export const TASK_STATES = [
  "Not Started",
  "In Progress",
  "Completed",
];

export const ALLOWED_TRANSITIONS = {
  "Not Started": ["In Progress"],
  "In Progress": ["Completed"],
  "Completed": [],
};

export const canTransition = (from, to) => {
  return ALLOWED_TRANSITIONS[from]?.includes(to);
};
