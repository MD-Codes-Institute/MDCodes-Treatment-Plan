import { useHistory } from "react-router-dom";
import plusIcon from "../../../public/resources/plus-icon.svg";
const GoToTab1 = () => {
  const history = useHistory();
  return (
    <div className="fixed left-1/2 bottom-5 m-0 p-0 transform -translate-x-1/2 z-50">
      <button
        onClick={() => history.push("/tabs/tab1")}
        style={{
          borderRadius: "100%",
          backgroundColor: "var(--ion-background-inputs) !important",
          padding: '3px',
          boxShadow: "0px 2px 5px #000"
        }}
      >
        <img src={plusIcon} alt="icon to add more" width={48} height={48} />
      </button>
    </div>
  );
};

export default GoToTab1;
