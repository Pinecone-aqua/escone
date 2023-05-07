/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { useUser } from "@/context/userContext";

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [pass, setpass] = useState<boolean>(false);
  const emailRef = useRef<string>();
  const passwordRef = useRef<string>("");
  const nameRef = useRef<string>();
  const password2Ref = useRef<string>();
  const { setToken } = useUser();
  const modalHeader = (
    <div className="modal-header">
      <h1>Login | Register</h1>
    </div>
  );

  const Router = useRouter();
  function registerHandler() {
    const user = {
      username: nameRef.current,
      email: emailRef.current,
      password: passwordRef.current,
    };
    axios.post("http://localhost:3030/user/add", user).then((res) => {
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

    axios.get(`http://localhost:3030/user/login?token=${user}`).then((res) => {
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
      .get("http://localhost:3030/user/google")
      .then((res) => Router.push(res.data));
  }

  return (
    <div className="login">
      <Button
        outlined
        onClick={() => setVisible(true)}
        className="login-button"
      >
        Login
      </Button>
      <Dialog
        header={modalHeader}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="modal-content">
          <Button
            outlined
            onClick={googleHandler}
            className="google-button w-full flex gap-2 items-center justify-center"
          >
            <FcGoogle />
            Sign in with <span className="font-semibold">Google account</span>
          </Button>

          <Divider layout="horizontal" align="center">
            <b>OR</b>
          </Divider>

          <div className="modal-inputs w-[500px] justify-between flex flex-wrap gap-2">
            <InputText
              className="w-[245px]"
              type="email"
              placeholder="Email Address"
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
            />
            <InputText
              type="password"
              placeholder="Password"
              className={`input ${!pass && register} w-[245px]`}
              onChange={(e) => {
                passwordRef.current = e.target.value;
                setpass(
                  passwordRef.current != "" &&
                    password2Ref.current == passwordRef.current
                );
              }}
            />
            {register && (
              <>
                <InputText
                  className="w-[245px]"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    nameRef.current = e.target.value;
                  }}
                />
                <InputText
                  className="w-[245px]"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    password2Ref.current = e.target.value;
                    setpass(
                      password2Ref.current != "" &&
                        password2Ref.current == passwordRef.current
                    );
                  }}
                />
              </>
            )}
          </div>

          <div className="modal-footer mt-5 h-[90px] flex flex-col gap-3">
            <Button
              outlined
              className="w-full"
              severity="success"
              label={register ? "Register" : "Login"}
              onClick={() => {
                register ? pass && registerHandler() : loginHandler();
              }}
            />
            {register ? (
              <p>
                Already have an acccount?{" "}
                <span
                  className="font-semibold"
                  onClick={() => setRegister(false)}
                >
                  Sign in
                </span>
              </p>
            ) : (
              <p>
                {"Don't"} have an acccount?{" "}
                <span
                  className="font-semibold"
                  onClick={() => setRegister(true)}
                >
                  Create one
                </span>
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
