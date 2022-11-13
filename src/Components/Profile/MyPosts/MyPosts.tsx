import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "../../Common/FormsControls/FormsControls";
import styles from "./my-posts.module.scss";
import Post from "./Post/Post";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PostType } from "../../../types/types";

const schema = yup.object().shape({
  newPost: yup
    .string()
    .required("Заполните поле")
    .min(2, "Пороль должен содержать как минимум 2 символа")
    .max(10, "Пороль может содержать максимум 10 символов"),
});

interface IAddPostFormProps {
  addPost: (newPost: string) => void;
}

interface FormValues {
  newPost: string;
}

const AddPostForm: FC<IAddPostFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    props.addPost(data.newPost);
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={styles["post-area"]}
    >
      <Textarea
        type="text"
        placeholder="Add new post"
        name={{ ...register("newPost") }}
        error={!!errors?.newPost}
        helperText={errors?.newPost?.message}
      />
      <button type="submit" className={styles.button}>
        Add post
      </button>
    </form>
  );
};

interface IMyPostsProps {
  posts: Array<PostType>;
  addPost: (newPost: string) => void;
}

const MyPosts: FC<IMyPostsProps> = (props) => {
  return (
    <div className={styles.posts}>
      <h3>My posts</h3>
      <AddPostForm addPost={props.addPost} />
      <div>New post</div>
      <div>
        {props.posts.map((x) => {
          return (
            <Post key={x.id} message={x.message} likesCount={x.likesCount} />
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;
