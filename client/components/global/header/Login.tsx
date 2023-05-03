/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PrimeIcons } from "primereact/api";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import Link from "next/link";

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
  const modalHeader = (
    <div className="modal-header">
      <h1>Login | Register</h1>
    </div>
  );

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
                <li key={index} className={socialLink.icon}>
                  <Link href={socialLink.url} />
                </li>
              ))}
            </ul>
          </div>
          <Divider align="center">OR</Divider>
          <div className="login-inputs">
            <InputText type="email" placeholder="Email Address" className="input" />
            <InputText type="password" placeholder="Password" className="input" />
          </div>
          <div className="modal-footer">
            <Button label="Login" onClick={() => setVisible(false)} />
            <Button label="Register" onClick={() => setVisible(false)} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
