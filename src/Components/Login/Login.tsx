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
import stylesLogin from "./login.module.scss";
import getClassName from "../../Services/Service";

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
    <div
      className={getClassName(
        "flex _direction-column _align-items-center",
        stylesLogin["login-wrapper"]
      )}
    >
      {props.errorMessage && (
        <div className={styles["form-common-error"]}>
          Неверный Email или Пароль
        </div>
      )}
      <h1 className={stylesLogin.title}>Login</h1>
      <form
        className={stylesLogin["login-form"]}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            className={stylesLogin.field}
            formControlClassName={stylesLogin["form-control-field"]}
            type="email"
            placeholder="Login"
            name={{ ...register("email") }}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        </div>
        <div>
          <Input
            className={stylesLogin.field}
            formControlClassName={stylesLogin["form-control-field"]}
            type="password"
            placeholder="Password"
            name={{ ...register("password") }}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        </div>
        <div className={stylesLogin["remember-block"]}>
          <Input
            className={stylesLogin["remember-checkbox"]}
            type="checkbox"
            name={{ ...register("rememberMe") }}
          />
          <span className={stylesLogin["remember-text"]}>Запомнить меня</span>
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
        <button
          className={getClassName(
            stylesLogin["login-button"],
            !isValid && styles["_disable"]
          )}
          type="submit"
          disabled={!isValid}
        >
          Login
        </button>
      </form>
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
