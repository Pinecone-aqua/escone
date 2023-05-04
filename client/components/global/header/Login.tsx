/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PrimeIcons } from "primereact/api";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface SocialLink {
  label: string;
  icon: any;
  url: string;
}

const socialLinks: SocialLink[] = [
  { label: "google", icon: PrimeIcons.GOOGLE, url: "/" },
  { label: "whatsapp", icon: PrimeIcons.WHATSAPP, url: "/" },
  { label: "twitter", icon: PrimeIcons.TWITTER, url: "/" },
  { label: "facebook", icon: PrimeIcons.FACEBOOK, url: "/" },
  { label: "instagram", icon: PrimeIcons.INSTAGRAM, url: "/" },
];

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const emailRef = useRef<string>();
  const passwordRef = useRef<string>();

  const modalHeader = (
    <div className="modal-header">
      <h1>Login | Register</h1>
    </div>
  );

  const Router = useRouter();

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
      if (res.data.token) {
        Cookies.set("token", res.data.token);
        setVisible(false);
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
          <div className="social-links">
            <ul>
              {socialLinks.map((socialLink, index) => (
                <li
                  key={index}
                  className={socialLink.icon}
                  onClick={() =>
                    socialLink.label == "google" ? googleHandler() : ""
                  }
                >
                  <Link href={socialLink.url} />
                </li>
              ))}
            </ul>
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
              className="input"
              onChange={(e) => {
                passwordRef.current = e.target.value;
              }}
            />
          </div>
          <div className="modal-footer">
            <Button
              label="Login"
              onClick={() => {
                loginHandler();
              }}
            />
            <Button label="Register" onClick={() => setVisible(false)} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
