import { useReducer } from "react";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number };

const initialState: Task[] = [];

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      if (!action.payload.trim()) return state;
      return [
        ...state,
        { id: Date.now(), text: action.payload, done: false },
      ];

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, done: !task.done }
          : task
      );

    default:
      return state;
  }
}

export default function useTodos() {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  const addTask = (text: string) => {
    dispatch({ type: "ADD", payload: text });
  };

  const toggleTask = (id: number) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  return { tasks, addTask, toggleTask };
}
