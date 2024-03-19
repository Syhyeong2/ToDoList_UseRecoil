import React from "react";
import { IToDo, toDoState, categoryState } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteFn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((cat) => cat !== category)
        .map((cat) => (
          <button key={cat} onClick={onClick}>
            {cat}
          </button>
        ))}
      <button onClick={deleteFn}>Delete</button>
    </li>
  );
}

export default ToDo;
