import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Tab2.css";
import { Row, VOLUMES } from "../contents/tabs/ContentsTab1";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const Tab2: React.FC = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const preselected = params.get("code") || "";
  const [date] = useState(new Date());
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const codeList = localStorage.getItem("debugCodeList") || "[]";
    const codes: string[] = JSON.parse(codeList);

    if (codes.length == 0 || codes.length <= 0) return;

    const newRows: Row[] = codes.map((code) => ({
      id: uid(),
      code: code,
      product: "VM",
      right: "0.1",
      mid: "0",
      left: "0.1",
    }));

    setRows(newRows);
  }, [preselected]);

  function updateRow<T extends keyof Row>(id: string, field: T, value: Row[T]) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }
  return (
    <IonPage>
      <IonContent className="container-main">
        <section className="container-header">
          <div className="container-input">
            <div className="container-age">
              <p>Age:</p>
              <input type="number" max="100" />
              <p className="date-container">
                Date: {date.toLocaleDateString()}
              </p>
            </div>
            <div className="container-name">
              <p>Name:</p>
              <input type="text" />
            </div>
          </div>
        </section>

        {/* Ações simples */}

        {/* Títulos */}
        <section className="container-colums sub-container-colums-title">
          <p>Code</p>
          <p>Product</p>
          <p>Right</p>
          <p>Mid</p>
          <p>Left</p>
        </section>

        {/* Linhas (apenas criadas quando veio ?code=...) */}
        {rows.map((row) => (
          <section className="container-colums" key={row.id}>
            {/* CODE (editável, mas começa com o que veio da Tab1) */}
            <input
              className="list-colums"
              value={row.code}
              onChange={(e) => updateRow(row.id, "code", e.target.value)}
              disabled
            />

            {/* PRODUCT */}
            <select
              className="list-colums"
              value={row.product}
              onChange={(e) => updateRow(row.id, "product", e.target.value)}
            >
              <option value="VM">VM</option>
              {/* adicione outros produtos se quiser */}
            </select>

            {/* RIGHT */}
            <select
              className="list-colums"
              value={row.right}
              onChange={(e) => updateRow(row.id, "right", e.target.value)}
            >
              {VOLUMES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* MID */}
            <select
              className="list-colums"
              value={row.mid}
              onChange={(e) => updateRow(row.id, "mid", e.target.value)}
            >
              {VOLUMES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* LEFT */}
            <select
              className="list-colums"
              value={row.left}
              onChange={(e) => updateRow(row.id, "left", e.target.value)}
            >
              {VOLUMES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </section>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
