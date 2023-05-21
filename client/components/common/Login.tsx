/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { useUser } from "@/context/userContext";

export default function Login({ show }: { show?: boolean }) {
  const [visible, setVisible] = useState<boolean>(show || false);
  const [register, setRegister] = useState<boolean>(false);
  const [pass, setpass] = useState<boolean>(false);
  const emailRef = useRef<string>();
  const passwordRef = useRef<string>("");
  const nameRef = useRef<string>();
  const password2Ref = useRef<string>();
  const { setToken } = useUser();

  const modalHeader = (
    <div className="modal-header">
      <h1>{register ? "Бүртгүүлэх" : "Нэвтрэх"}</h1>
    </div>
  );

  const Router = useRouter();

  function registerHandler() {
    const user = {
      username: nameRef.current,
      email: emailRef.current,
      password: passwordRef.current,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user/add`, user)
      .then((res) => {
        if (res.data.status) {
          loginHandler();
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  }

  function loginHandler() {
    const secret = "nuurs ug";
    const payload = {
      email: emailRef.current,
      password: passwordRef.current,
    };
    const user = jwt.sign(payload, secret);
    console.log(user);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user/login?token=${user}`)
      .then((res) => {
        if (res.data.status) {
          Cookies.set("token", res.data.token);
          setToken(res.data.token);
          setVisible(false);
          toast.success(res.data.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(res.data.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  }

  function googleHandler() {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user/google`)
      .then((res) => Router.push(res.data));
  }

  return (
    <div className="login">
      <button onClick={() => setVisible(true)} className="login-btn">
        Нэвтрэх
      </button>
      <Dialog
        header={modalHeader}
        visible={visible}
        onHide={() => setVisible(show || false)}
      >
        <div className="login-modal">
          <button onClick={googleHandler} className="btn-google">
            <FcGoogle />
            <span>Google account</span>-аар нэвтрэх
          </button>

          <Divider layout="horizontal" align="center">
            <b>эсвэл</b>
          </Divider>

          <div className="login-inputs">
            <input
              type="text"
              placeholder="Цахим шуудан"
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Нууц үг"
              onChange={(e) => {
                passwordRef.current = e.target.value;
                setpass(
                  passwordRef.current != "" &&
                    password2Ref.current == passwordRef.current
                );
              }}
              className={`login-input ${!pass && register}`}
            />
            {register && (
              <>
                <input
                  type="text"
                  placeholder="Хэрэглэгчийн нэр"
                  onChange={(e) => {
                    nameRef.current = e.target.value;
                  }}
                  className="login-input"
                />
                <input
                  type="password"
                  placeholder="Нууц үг баталгаажуулах"
                  onChange={(e) => {
                    password2Ref.current != e.target.value;
                    setpass(
                      password2Ref.current != "" &&
                        password2Ref.current == passwordRef.current
                    );
                  }}
                  className="login-input"
                />
              </>
            )}
          </div>

          <div className="login-footer">
            <button
              onClick={() => {
                register ? pass && registerHandler() : loginHandler();
              }}
            >
              {register ? "Бүртгүүлэх" : "Нэвтрэх"}
            </button>

            {register ? (
              <p>
                Та бүртгэлтэй юу?
                <span onClick={() => setRegister(false)}> Нэвтрэх</span>
              </p>
            ) : (
              <p>
                Та бүртгэлгүй юу?
                <span onClick={() => setRegister(true)}> Бүртгүүлэх</span>
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
