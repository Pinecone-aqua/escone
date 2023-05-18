import { useUser } from "@/context/userContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiEdit, FiEdit3, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

function Settings() {
  const { user } = useUser();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [updatedUser, setUpdatedUser] = useState<any>();
  const [newProfileImage, setNewProfileImage] = useState<File>();
  const [userNameEdit, setUserNameEdit] = useState<{
    edit: boolean;
    data: string;
  }>({ edit: true, data: "" });
  const [emailEdit, setEmailEdit] = useState<{
    edit: boolean;
    data: string;
  }>({ edit: true, data: "" });

  const [oldPasswordShow, setoldPasswordShow] = useState<boolean>(false);
  const [oldPassword, setoldPassword] = useState<string>("");
  const [newPasswordShow, setnewPasswordShow] = useState<boolean>(false);
  const [confirmNewPasswordShow, setConfirmNewPasswordShow] =
    useState<boolean>(false);
  const [newPassword, setnewPassword] = useState<{
    pass: string;
    confirmPass: string;
  }>({ pass: "", confirmPass: "" });

  useEffect(() => {
    user && setUpdatedUser(user);
  }, [user]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uploadImageHandler(e: any) {
    console.log(e.target.files[0]);
    setNewProfileImage(e.target.files[0]);
  }

  function saveHandler() {
    const token = Cookies.get("token");
    if (newPassword.confirmPass != newPassword.pass) {
      toast.warning("confirm password is different ");
      return;
    }
    console.log(newPassword.pass != "" && oldPassword == "");
    if (newPassword.pass != "") {
      if (oldPassword == "") {
        toast.warning("old password is empty ");
        return;
      } else {
        updatedUser.oldpassword = oldPassword;
        updatedUser.password = newPassword.pass;
      }
    }
    delete updatedUser?.exp;
    delete updatedUser?.iat;
    const userFormData = new FormData();
    if (
      updatedUser?.username &&
      userNameEdit.data != "" &&
      updatedUser.username != userNameEdit.data
    ) {
      updatedUser.username = userNameEdit.data;
    }

    if (
      updatedUser?.email &&
      emailEdit.data != "" &&
      updatedUser.email != emailEdit.data
    ) {
      updatedUser.email = emailEdit.data;
    }
    if (newProfileImage) {
      userFormData.append("image", newProfileImage);
    }

    userFormData.append("body", JSON.stringify(updatedUser));
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/update/${user?._id}`,
        userFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.token) {
          Cookies.remove("token");
          Cookies.set("token", res.data.token);
          router.reload();
        }
      });
  }

  return (
    <div className="settings">
      <h2>User Information</h2>
      <div className="settings-body">
        <div className="profile-image">
          {newProfileImage ? (
            <picture>
              <img src={URL.createObjectURL(newProfileImage)} alt="profile" />
            </picture>
          ) : (
            <picture>
              <img src={updatedUser?.image} alt="profile" />
            </picture>
          )}

          <label>
            <p>
              <FiEdit />
            </p>
            <input
              type="file"
              name="image"
              onChange={uploadImageHandler}
              value={""}
              className="hidden"
            />
          </label>
        </div>

        <div className="profile-information">
          <div className="main detail">
            <h5>Change username</h5>
            <div className="username">
              <p className="label">username:</p>
              <input
                type="text"
                defaultValue={updatedUser?.username}
                disabled={userNameEdit.edit}
                onChange={(e) =>
                  setUserNameEdit({
                    edit: false,
                    data: e.target.value,
                  })
                }
              />
              <button
                onClick={() =>
                  setUserNameEdit({
                    edit: !userNameEdit.edit,
                    data: userNameEdit.data,
                  })
                }
              >
                <FiEdit3 />
              </button>
            </div>

            <div className="email">
              <p className="label">email:</p>
              <input
                type="text"
                defaultValue={updatedUser?.email}
                disabled={emailEdit.edit}
                onChange={(e) =>
                  setEmailEdit({
                    edit: false,
                    data: e.target.value,
                  })
                }
              />
              <button
                onClick={() =>
                  setEmailEdit({
                    edit: !emailEdit.edit,
                    data: emailEdit.data,
                  })
                }
              >
                <FiEdit3 />
              </button>
            </div>
          </div>

          <div className="password detail">
            <h5>Change password</h5>
            <div className="password-inputs">
              <div className="old">
                <p className="label">old: </p>
                <input
                  type={oldPasswordShow ? `text` : `password`}
                  onChange={(e) => setoldPassword(e.target.value)}
                />
                <button onClick={() => setoldPasswordShow(!oldPasswordShow)}>
                  <FiEye />
                </button>
              </div>

              <div className="new">
                <p className="label">new:</p>
                <input
                  type={newPasswordShow ? `text` : `password`}
                  className={
                    newPassword.confirmPass == newPassword.pass
                      ? "correct"
                      : "wrong"
                  }
                  onChange={(e) => {
                    newPassword.pass = e.target.value;
                    setnewPassword({ ...newPassword });
                  }}
                />
                <button onClick={() => setnewPasswordShow(!newPasswordShow)}>
                  <FiEye />
                </button>
              </div>

              <div className="confirm">
                <p className="label">confirm: </p>
                <input
                  type={confirmNewPasswordShow ? `text` : `password`}
                  className={
                    newPassword.confirmPass == newPassword.pass
                      ? "correct"
                      : "wrong"
                  }
                  onChange={(e) => {
                    newPassword.confirmPass = e.target.value;
                    setnewPassword({ ...newPassword });
                  }}
                />
                <button
                  onClick={() =>
                    setConfirmNewPasswordShow(!confirmNewPasswordShow)
                  }
                >
                  <FiEye />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <button onClick={saveHandler} className="save">
        Save changes
      </button>
    </div>
  );
}

export default Settings;
