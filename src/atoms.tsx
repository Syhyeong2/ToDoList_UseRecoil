import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
const { persistAtom } = recoilPersist();

export const categoryState = atom<string[]>({
  key: "categoryList",
  default: ["TO_DO", "DONE", "DOING"],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategoryState = atom({
  key: "selectedCategory",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
