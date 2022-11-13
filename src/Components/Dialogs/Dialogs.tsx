import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../Common/FormsControls/FormsControls";

import DialogItem from "./DialogItem/DialogItem";
import styles from "./dialogs.module.scss";
import Message from "./Message/Message";
import { actions } from "../../Redux/dialogs-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getDialogs, getMessages } from "../../Redux/selectors";
import withAuthRedirect from "../../hoc/withAuthRedirect";

const schema = yup.object().shape({
  newMessageBody: yup
    .string()
    .required("Заполните поле")
    .min(5, "Пороль должен содержать как минимум 5 символов")
    .max(10, "Пороль может содержать максимум 10 символов"),
});

interface FormValues {
  newMessageBody: string;
}

const AddMessageForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(actions.sendMessage(data.newMessageBody));
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="text"
          placeholder="Enter your message"
          name={{ ...register("newMessageBody") }}
          error={!!errors?.newMessageBody}
          helperText={errors?.newMessageBody?.message}
        />
      </div>
      <div>
        <button>Отправить</button>
      </div>
    </form>
  );
};

const Dialogs: FC = () => {
  const dialogs = useSelector(getDialogs);
  const messages = useSelector(getMessages);
  return (
    <div className={styles.container}>
      <div className={styles.dialogs}>
        <div className={styles["dialogs-items"]}>
          {dialogs.map((x) => {
            return <DialogItem key={x.id} name={x.name} id={x.id} />;
          })}
        </div>
      </div>
      <div className={styles.messages}>
        <div>
          {messages.map((x) => {
            return <Message key={x.id} message={x.message} />;
          })}
        </div>
        <AddMessageForm />
      </div>
    </div>
  );
};

export default withAuthRedirect(Dialogs);
