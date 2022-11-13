import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input } from "../Common/FormsControls/FormsControls";
import styles from "../Common/FormsControls/forms-control.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppStateType } from "../../Redux/redux-store";
import { actions } from "../../Redux/auth-reducer";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат e-mail адреса")
    .required("Заполните поле"),
  password: yup
    .string()
    .required("Заполните поле")
    .min(4, "Пароль должен содержать как минимум 4 символа")
    .max(10, "Пароль может содержать максимум 10 символов"),
});

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
}

const Login: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    props.login(data.email, data.password, data.rememberMe, data.captcha);
    reset();
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="email"
            placeholder="Login"
            name={{ ...register("email") }}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            name={{ ...register("password") }}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        </div>
        <div>
          <Input type="checkbox" name={{ ...register("rememberMe") }} />
          <span>Запомнить меня</span>
        </div>
        {props.captchaUrl && (
          <>
            <img alt="" src={props.captchaUrl} />
            <div>
              <Input
                type="text"
                placeholder="Write captcha"
                name={{ ...register("captcha") }}
              />
            </div>
          </>
        )}
        <button type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
      {props.errorMessage && (
        <div className={styles["form-common-error"]}>
          Неверный Email или Пароль
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
  errorMessage: state.auth.errorMessage,
});

const connector = connect(mapStateToProps, { login: actions.getLoginData });

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux; // type Props = PropsFromRedux & {other props not from redux}

export default connector(Login);
