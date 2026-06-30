import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSignIn } from "../../data/auth/ContentForms";
import updateUserInfo from "../../api/auth/updateUserInfo";
import { useHistory } from "react-router";
import { IonContent, IonPage } from "@ionic/react";

const classInputs = {
  border: "1px solid oklch(98.7% 0.022 95.277)",
  borderRadius: "2rem",
  width: "16.25rem",
  height: "2.5rem",
  color: "#FFF",
  paddingInline: "20px",
};

const classBtnSubmit = {
  border: "1px solid #fff",
  boxShadow: "0px 0px 7px #967F43",
  borderRadius: 16,
  color: "#fff",
  fontSize: "1.05rem",
  width: "200px",
  height: "40px",
  background: "#967F43",
};

const reauthenticateUser: React.FC = () => {
  const { reauthenticate } = updateUserInfo();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaSignIn) });

  const onSubmit = (data: any) => {
    reauthenticate(data).then(() => {
      console.log("Reautenticação feita com sucesso");
      history.push("/edit-profile");
    });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-full items-center justify-center gap-5 overflow-y-hidden">
          <h1 className="text-white h-[15vh]">Reauthenticate Page</h1>
          <label htmlFor="email">E-mail</label>
          <input style={classInputs} type="text" {...register("email")} />
          {errors && <span>{errors.email?.message}</span>}

          <label htmlFor="password">Password</label>
          <input style={classInputs} type="password" {...register("password")} />
          {errors && <span>{errors.password?.message}</span>}

          <button onClick={handleSubmit(onSubmit)} style={classBtnSubmit}>
            Submit
          </button>
          <button className="text-white" onClick={() => history.push("/tabs/tab3")}>
            Cancel
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default reauthenticateUser;
