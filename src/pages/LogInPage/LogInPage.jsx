import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/schemas";

import s from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });
const dispatch = useDispatch();
const navigate = useNavigate();

  const onSubmit = (values) => {
    let data = { ...values };
    delete data.confirmPassword;
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={s.section}>
      <div className={s.logBox}>
        <div className={s.logoWrapper}>
            <svg className={s.logo}>
              <use href={"/symbol.svg#icon-logo"} />
            </svg>
            <p className={s.logoText}>read journey</p>
        </div>
        <h1 className={s.title}>
          Expand your mind, reading <span className={s.accent}>a book</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputBox}>
            <div className={s.inputWrapper}>
                <input
                  {...register("email")}
                  className={s.input}
                  placeholder="Your@email.com"
                  autoComplete="email"
                />
                <label htmlFor="email" className={s.label}>Mail</label>
            {errors.email && <p className={s.error}>{errors.email.message}</p>}

            </div>
            <div className={s.inputWrapper}>
                <input
                  {...register("password")}
                  className={s.inputPass}
                  placeholder="Yourpasswordhere"
                  autoComplete="password"
                  type={passwordVisible ? "text" : "password"}
                />
                <label htmlFor="password" className={s.label}>Password</label>
                <svg className={s.eyeIcon} onClick={() => setPasswordVisible(!passwordVisible)}>
                <use href={`/symbol.svg#${passwordVisible ? "icon-eye" : "icon-eye-off"}`} />
              </svg>
            {errors.password && <p className={s.error}>{errors.password.message}</p>}
            </div>
          </div>
          <button type="submit" className={s.submitBtn}>
            Log In
          </button>
          <NavLink  to="/register" className={s.link}>Don’t have an account?</NavLink>
        </form>
      </div>
      <div className={s.prevBox}>
      <div className={s.img}></div>
      </div>
    </div>
  );
};

export default LogInPage;
