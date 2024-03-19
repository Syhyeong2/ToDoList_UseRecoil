import React from "react";
import { useForm } from "react-hook-form";
import { categoryState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategory = useSetRecoilState(categoryState);

  const onValid = ({ newCategory }: IForm) => {
    setCategory((oldCategories) => {
      if (oldCategories.includes(newCategory)) {
        return oldCategories;
      }
      return [...oldCategories, newCategory];
    });
    setValue("newCategory", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("newCategory", {
            required: "A category name is required",
          })}
          placeholder="Add new category"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateCategory;
