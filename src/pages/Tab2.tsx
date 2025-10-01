import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Tab2.css";
import { code } from "ionicons/icons";

type Row = {
  id: string;
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
};

const VOLUMES = ["0","0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","1"];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const Tab2: React.FC = () => {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const preselected = params.get("code") || ""; 

  const [date] = useState(new Date());
  const [rows, setRows] = useState<Row[]>([]);

  
  useEffect(() => {
    if (!preselected) return;
    const newRow: Row = {
      id: uid(),
      code: preselected,
      product: "VM",
      right: "0.1",
      mid: "0",
      left: "0.1",
    };
    setRows(prev => [...prev, newRow]);
    // Dica: se você NÃO quiser permitir duplicados consecutivos, faça:
    
  }, [preselected]);

  function updateRow<T extends keyof Row>(id: string, field: T, value: Row[T]) {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function removeRow(id: string) {
    setRows(prev => prev.filter(r => r.id !== id));
  }


  return (
    
      <IonContent className="container-main">

        <section className="container-header">
          <div className="container-input">
            <div className="container-age">
              <p>Age:</p>
              <input type="number" max="100" />
              <p className="date-container">Date: {date.toLocaleDateString()}</p>
            </div>
            <div className="container-name">
              <p>Name:</p>
              <input type="text" />
            </div>
          </div>
        </section>

        {/* Ações simples */}
        

        {/* Títulos */}
        <section className="container-colums">
          <div className="sub-container-colums-title">
            <p>Code</p>
            <p>Product</p>
            <p>Right</p>
            <p>Mid</p>
            <p>Left</p>
            <p></p>
          </div>
        </section>

        {/* Linhas (apenas criadas quando veio ?code=...) */}
        {rows.map(row => (
          <section className="container-colums" key={row.id}>
            {/* CODE (editável, mas começa com o que veio da Tab1) */}
            <input
              className="list-colums"
              value={row.code}
              onChange={(e) => updateRow(row.id, "code", e.target.value)} disabled
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
              {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            {/* MID */}
            <select
              className="list-colums"
              value={row.mid}
              onChange={(e) => updateRow(row.id, "mid", e.target.value)}
            >
              {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            {/* LEFT */}
            <select
              className="list-colums"
              value={row.left}
              onChange={(e) => updateRow(row.id, "left", e.target.value)}
            >
              {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            
            
          </section>
        ))}
      </IonContent>

  );
};

export default Tab2;
