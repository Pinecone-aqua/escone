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

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [pass, setpass] = useState<boolean>(false);
  const emailRef = useRef<string>();
  const passwordRef = useRef<string>("");
  const nameRef = useRef<string>();
  const password2Ref = useRef<string>();

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
      console.log(res);
    });
    console.log(user);
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
      console.log(res.data);

      if (res.data.status) {
        Cookies.set("token", res.data.token);
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
        console.log(res.data.data);
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
    console.log("clicked");
    axios
      .get("http://localhost:3030/user/google")
      .then((res) => Router.push(res.data));
  }

  return (
    <div className="login-button mx-5">
      <Button
        label="Login"
        onClick={() => setVisible(true)}
        className="bg-primary border-none"
      />
      <Dialog
        header={modalHeader}
        visible={visible}
        className="login"
        onHide={() => setVisible(false)}
      >
        <div className="login-content">
          <p>Sign up with your social media account or email address</p>
          <div className="mt-3">
            <button
              className={`w-full border p-2 flex text-2xl items-center gap-3 justify-center rounded-full`}
              onClick={googleHandler}
            >
              {<FcGoogle size={"30px"} />}
              Google sign in
            </button>
          </div>
          <Divider align="center">OR</Divider>
          <div className="login-inputs">
            <InputText
              type="email"
              placeholder="Email Address"
              className="input"
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
            />
            <InputText
              type="password"
              placeholder="Password"
              className={`input ${!pass && register && `p-invalid`}`}
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
                  type="text"
                  placeholder="Username"
                  className="input"
                  onChange={(e) => {
                    nameRef.current = e.target.value;
                  }}
                />
                <InputText
                  type="password"
                  placeholder="Confirm Password"
                  className={`input ${!pass && `p-invalid`}`}
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
          <div className="modal-footer">
            <Button
              label={register ? "register" : "login"}
              onClick={() => {
                register ? pass && registerHandler() : loginHandler();
              }}
            />
            {register ? (
              <p className="">
                already have an acccount ?{" "}
                <span onClick={() => setRegister(false)}>Sign in</span>
              </p>
            ) : (
              <p className="">
                {"don't"} have an acccount ?{" "}
                <span onClick={() => setRegister(true)}>Create one</span>
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
