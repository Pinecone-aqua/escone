import { useUser } from "@/context/userContext";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";

function Settings() {
  const { user } = useUser();
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
        `${process.env.BACK_END_URL}/user/update/${user?._id}`,
        userFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("hh");
        console.log(res);
      });
  }

  return (
    <div className="recipes lg:w-9/12  flex h-full flex-col items-end gap-3">
      <div className="flex gap-20 w-full items-center">
        <div className="w-52 rounded-full relative flex flex-col gap-8">
          <p className="text-xl font-semibold text-primary ">Change picture</p>
          {newProfileImage ? (
            <picture>
              <img
                src={URL.createObjectURL(newProfileImage)}
                alt="profile"
                className="w-full rounded-full"
              />
            </picture>
          ) : (
            <picture>
              <img
                src={updatedUser?.image}
                alt="profile"
                className="w-full rounded-full"
              />
            </picture>
          )}
          <label className=" absolute bottom-0 right-0">
            <p className="text-3xl p-4 bg-gray-500 bg-opacity-50 hover:bg-opacity-80 rounded-full">
              <FiEdit />
            </p>
            <input
              type="file"
              name="image"
              id=""
              onChange={uploadImageHandler}
              value={""}
              className="hidden"
            />
          </label>
        </div>
        <div className=" flex  gap-4">
          <div className="flex flex-col  gap-4">
            <label className="flex items-center gap-2">
              <p className="font-semibold">User Name : </p>
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
                className="p-0 border-none"
              />
              <p
                className=""
                onClick={() =>
                  setUserNameEdit({
                    edit: !userNameEdit.edit,
                    data: userNameEdit.data,
                  })
                }
              >
                <FiEdit3 />
              </p>
            </label>
            <label className="flex items-center gap-2 w-[400px]">
              <p className="font-semibold"> Email : </p>
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
                className="p-1 border-none w-8/12"
              />
              <p
                className=""
                onClick={() =>
                  setEmailEdit({
                    edit: !emailEdit.edit,
                    data: emailEdit.data,
                  })
                }
              >
                <FiEdit3 />
              </p>
            </label>
          </div>
          <div className="">
            <p className="font-semibold">Change password </p>
            <div className="ps-5 flex flex-col gap-4">
              <label
                htmlFor=""
                className="flex gap-3 items-center w-[400px] justify-between"
              >
                <p className="w-2/6">old password :</p>
                <input
                  type={oldPasswordShow ? `text` : `password`}
                  className="p-1 rounded-lg w-5/12"
                  onChange={(e) => setoldPassword(e.target.value)}
                />
                <p
                  className=""
                  onClick={() => setoldPasswordShow(!oldPasswordShow)}
                >
                  show
                </p>
              </label>
              <label
                htmlFor=""
                className="flex gap-3 items-center w-[400px] justify-between"
              >
                <p className="w-2/6">new password :</p>
                <input
                  type={newPasswordShow ? `text` : `password`}
                  className={`p-1 rounded-lg w-5/12 ${
                    newPassword.confirmPass == newPassword.pass
                      ? `border-2 border-green-500`
                      : `border-2 border-red-500`
                  }`}
                  onChange={(e) => {
                    newPassword.pass = e.target.value;
                    setnewPassword({ ...newPassword });
                  }}
                />
                <p
                  className=""
                  onClick={() => setnewPasswordShow(!newPasswordShow)}
                >
                  show
                </p>
              </label>
              <label
                htmlFor=""
                className="flex gap-3 items-center w-[400px] justify-between"
              >
                <p className="w-2/6">confirm new password :</p>
                <input
                  type={confirmNewPasswordShow ? `text` : `password`}
                  className={`p-1 rounded-lg w-5/12 ${
                    newPassword.confirmPass == newPassword.pass
                      ? `border-2 border-green-500`
                      : `border-2 border-red-500`
                  }`}
                  onChange={(e) => {
                    newPassword.confirmPass = e.target.value;
                    setnewPassword({ ...newPassword });
                  }}
                />
                <p
                  className=""
                  onClick={() =>
                    setConfirmNewPasswordShow(!confirmNewPasswordShow)
                  }
                >
                  show
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <input
        type="button"
        value="save all"
        className="bg-green-400 text-green-800 border border-green-800 py-2 px-20 rounded-xl"
        onClick={saveHandler}
      />
    </div>
  );
}

export default Settings;
