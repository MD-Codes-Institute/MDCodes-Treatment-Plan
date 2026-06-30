import { useHistory } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import deleteAccount from "../../api/auth/deleteAccount";
const classBtns = {
  borderRadius: "5px",
  boxShadow: "0px 0px 3px #000",
};
const classModal = {
  borderRadius: "5px",
  boxShadow: "0px 0px 500px 230px #000",
};

const BtnsFirebase = () => {
  const { user, signOutUser } = useAuth();
  const history = useHistory();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    if (confirmDelete == true) {
      deleteAccount(user, history).then(() => {
        setConfirmDelete(false);
        setModal(false);
      });
    }
  }, [confirmDelete]);

  const handleDelete = () => {
    console.log("clicado");
    setModal(!modal);
  };

  return (
    <div className="flex flex-row gap-5 justify-center">
      {/* buttons de ações do firebase */}
      <button
        className="bg-(--ion-background-inputs) w-[28vw] text-[14px] text-red-600 h-10"
        style={classBtns}
        onClick={handleDelete}
      >
        Delete account
      </button>
      <button
        className="bg-(--ion-background-inputs) w-[28vw] text-[14px] text-white h-10"
        style={classBtns}
        onClick={() => history.push("/edit-profile")}
      >
        Edit Profile
      </button>
      <button
        className="bg-(--ion-background-inputs) w-[28vw] text-[14px] text-white h-10"
        style={classBtns}
        onClick={() => signOutUser()}
      >
        Logout
      </button>
      {/* fim buttons de ações do firebase*/}

      {/* modal para verificar se o usuário tem certeza que quer deletar a conta mesmo */}
      {modal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex flex-col absolute top-1/3 gap-9 bg-(--ion-background-containers) mx-5 h-60 justify-center items-center rounded-2xl"
          style={classModal}
        >
          <h3 className="text-white w-full text-center">
            Do you confirm the account deletion? This action is permanent.
          </h3>
          <div className="flex flex-row w-[90%] justify-center gap-7">
            <button className="text-red-600 mt-5" onClick={() => setConfirmDelete(true)}>
              Confirm
            </button>
            <button className="text-white mt-5" onClick={() => setModal(!modal)}>
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default BtnsFirebase;
