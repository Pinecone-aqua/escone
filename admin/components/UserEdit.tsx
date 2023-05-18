import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { Sidebar } from "primereact/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { FiEdit, FiEdit3, FiEye } from "react-icons/fi";
import Cookies from "js-cookie";
import { Toast } from "primereact/toast";
type PropsType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

function UserEdit({ show, setShow }: PropsType) {
  const [newPasswordShow, setnewPasswordShow] = useState<boolean>(false);
  const [confirmNewPasswordShow, setConfirmNewPasswordShow] =
    useState<boolean>(false);
  const [newPassword, setnewPassword] = useState<{
    pass: string;
    confirmPass: string;
  }>({ pass: "", confirmPass: "" });
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
  const [role, setRole] = useState<boolean>();

  const toast = useRef<Toast>(null);
  function hideHandler() {
    setShow(false);
    setUserNameEdit({ edit: true, data: "" });
    setEmailEdit({ edit: true, data: "" });
    setUpdatedUser(undefined);
    setNewProfileImage(undefined);

    setnewPasswordShow(false);
    setConfirmNewPasswordShow(false);

    setnewPassword({ pass: "", confirmPass: "" });
    const { pathname } = router;
    router.push({ pathname }, undefined, { shallow: true });
  }
  const router = useRouter();
  useEffect(() => {
    router.query.user &&
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/${router.query.user}`
        )
        .then((res) => setUpdatedUser(res.data));
  }, [router.query.user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uploadImageHandler(e: any) {
    console.log(e.target.files[0]);
    setNewProfileImage(e.target.files[0]);
  }

  function saveHandler() {
    const token = Cookies.get("token");
    if (newPassword.confirmPass != newPassword.pass) {
      toast.current?.show({
        severity: "warn",
        summary: "Confirmed",
        detail: "confirm password is different ",
        life: 3000,
      });
      return;
    }

    if (newPassword.pass != "") {
      updatedUser.password = newPassword.pass;
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
    if (role != undefined) {
      updatedUser.role = role;
    }
    if (newProfileImage) {
      userFormData.append("image", newProfileImage);
    }

    userFormData.append("body", JSON.stringify(updatedUser));
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/update/${updatedUser?._id}`,
        userFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.token) {
          hideHandler();
          router.reload();
        }
      });
  }
  return (
    <Sidebar
      visible={show}
      position="right"
      onHide={hideHandler}
      className="p-sidebar-lg"
    >
      {updatedUser ? (
        <div className="">
          <Toast ref={toast} />
          <div className="settings">
            <h2>User Information</h2>
            <div className="settings-body">
              <div className="profile-image">
                {newProfileImage ? (
                  <picture>
                    <img
                      src={URL.createObjectURL(newProfileImage)}
                      alt="profile"
                    />
                  </picture>
                ) : (
                  <picture>
                    <img src={updatedUser.image} alt="" />
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
                      defaultValue={updatedUser.username}
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
                  <div className="">
                    <h5>Change Role</h5>
                    <select
                      className="border-2  border-black rounded p-2"
                      onChange={(e) => setRole(e.target.value == "true")}
                    >
                      <option value="true" selected={updatedUser.role == true}>
                        admin
                      </option>
                      <option
                        value="false"
                        selected={updatedUser.role == false}
                      >
                        client
                      </option>
                    </select>
                  </div>
                </div>

                <div className="password detail">
                  <h5>Change password</h5>
                  <div className="password-inputs">
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
                      <button
                        onClick={() => setnewPasswordShow(!newPasswordShow)}
                      >
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
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin">
            <span className="bg-white h-1 w-1 text-white">.</span>
          </div>
        </div>
      )}
    </Sidebar>
  );
}

export default UserEdit;
