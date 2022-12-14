import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// sito-components
import SitoContainer from "sito-container";

// @emotion/css
import { css } from "@emotion/css";

// socket
import io from "socket.io-client";

// contexts
import { useUser } from "../../context/UserProvider";
import { useLanguage } from "../../context/LanguageProvider";
import { useNotification } from "../../context/NotificationProvider";

// services
import { login } from "../../services/post";

//own components
import Loading from "../../components/Loading/Section";

// utils
import { logUser, createCookie, userLogged } from "../../utils/functions";

import config from "../../config";

const SignIn = () => {
  const navigate = useNavigate();

  const { setUserState } = useUser();
  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const showNotification = (ntype, message) =>
    setNotificationState({ type: "set", ntype, message });

  const { register, handleSubmit } = useForm();

  const onSubmit = async (d) => {
    const { user, password } = d;
    setLoading(true);
    try {
      const response = await login(user, password);
      const { id, token, expiration } = response.data;
      logUser(remember, { id });
      const socket = io(config.socketUrl);
      socket.on("connect", () => socket.emit("user_connecting", id));
      setUserState({ type: "set", user: id, socket, resources: [] });
      createCookie(config.basicKey, expiration, token);
      setTimeout(() => {
        if (userLogged()) navigate("/");
      }, 100);
    } catch (error) {
      const data = await error.response.data;
      showNotification("error", languageState.texts.Errors[data.error]);
    }
    setLoading(false);
  };

  return (
    <SitoContainer
      flexDirection="column"
      sx={{ width: "100%", height: "100%" }}
    >
      <SitoContainer
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          marginTop: "10px",
        }}
      >
        <SitoContainer
          sx={{
            minWidth: "48px",
            minHeight: "48px",
            borderRadius: "100%",
            background: "red",
            marginRight: "10px",
            marginLeft: "20px",
          }}
        ></SitoContainer>
      </SitoContainer>
      <SitoContainer
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <SitoContainer
            flexDirection="column"
            sx={{
              width: "512px",
              height: "256px",
              marginRight: "10px",
              marginLeft: "20px",
              border: "2px solid #000000",
              padding: "50px",
              position: "relative",
            }}
          >
            <Loading visible={loading} />
            <h1 className={css({ margin: 0 })}>
              {languageState.texts.SignIn.Title}
            </h1>
            {languageState.texts.SignIn.Inputs.map((item) => (
              <SitoContainer key={item.id} flexDirection="column">
                <label className={css({ margin: "25px 0px 5px 0px" })}>
                  {item.label}
                </label>
                <input
                  required
                  id={item.id}
                  type={item.type}
                  placeholder={item.placeholder}
                  className={css({ padding: "5px" })}
                  {...register(item.id)}
                />
              </SitoContainer>
            ))}
            <SitoContainer justifyContent="flex-end" sx={{ marginTop: "10px" }}>
              <Link to={"/auth/recovery"} target="_blank" rel="noreferrer">
                {languageState.texts.SignIn.LinkRecover}
              </Link>
            </SitoContainer>
            <SitoContainer
              justifyContent="flex-end"
              sx={{ marginTop: "10px", gap: "15px" }}
            >
              {languageState.texts.SignIn.Buttons.map((item) => (
                <button
                  key={item.text}
                  type={item.type}
                  onClick={() =>
                    item.type === "button" ? navigate("/auth/sign-up") : {}
                  }
                >
                  {item.text}
                </button>
              ))}
            </SitoContainer>
          </SitoContainer>
        </form>
      </SitoContainer>
    </SitoContainer>
  );
};

export default SignIn;
