import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/schemas";

import s from "./RegisterPage.module.css";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={s.section}>
      <div className={s.regBox}>
        <div className={s.logoWrapper}>
            <svg className={s.logo}>
              <use href={"/symbol.svg#icon-logo"} />
            </svg>
            <p className={s.logoText}>read journey</p>
        </div>
        <h1 className={s.title}>
          Expand your mind, reading <span className={s.accent}>a book</span>
        </h1>
        <form>
          <div className={s.inputBox}>
          <div className={s.inputWrapper}>
                <input
                  {...register("name")}
                  className={s.inputName}
                  placeholder="Ilona Ratushniak"
                  autoComplete="name"
                />
                <label htmlFor="email" className={s.label}>Name</label>
            {errors.name && <p className={s.error}>{errors.name.message}</p>}

            </div>
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
          <div className={s.btnWrapper}>
            <button type="submit" className={s.submitBtn}>
              Registration
            </button>
            <NavLink  to="/login" className={s.link}>Already have an account?</NavLink>
          </div>
        </form>
      </div>
      <div className={s.prevBox}>
      <div className={s.img}></div>
      </div>
    </div>
  );
};

export default RegisterPage;
