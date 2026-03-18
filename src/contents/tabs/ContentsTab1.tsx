// conteudos da tab1 => criação dos pontos dos codigos

export type SpotCfg = {
  id: string;
  label: string;
  className: string;
  hasCluster?: boolean;
  options?: string[];
  zoomScale?: number;
  zoomOriginX?: string;
  zoomOriginY?: string;
};

export const SPOTS: SpotCfg[] = [
  {
    id: "ck",
    label: "Ck",
    className: "ck",
    hasCluster: true,
    options: ["Ck1", "Ck2", "Ck3", "Ck4", "Ck5"],
    zoomScale: 1.1,
  },
  {
    id: "o",
    label: "O",
    className: "o",
    hasCluster: true,
    options: ["O1", "O2", "O3"],
    zoomScale: 1.5,
  },
  {
    id: "e",
    label: "E",
    className: "e",
    hasCluster: true,
    options: ["E1", "E2", "E3"],
    zoomScale: 1.5,
  },
  {
    id: "t",
    label: "T",
    className: "t",
    hasCluster: true,
    options: ["T1", "T2"],
    zoomScale: 1.5,
  },
  {
    id: "tt",
    label: "Tt",
    className: "tt",
    hasCluster: true,
    options: ["Tt1", "Tt2", "Tt3"],
    zoomScale: 1.5,
  },
  {
    id: "nl",
    label: "NL",
    className: "nl",
    hasCluster: true,
    options: ["NL1", "NL2", "NL3"],
    zoomScale: 1.5,
  },
  {
    id: "m",
    label: "M",
    className: "m",
    hasCluster: true,
    options: ["M1", "M2", "M3"],
    zoomScale: 1.5,
  },
  {
    id: "jw",
    label: "Jw",
    className: "jw",
    hasCluster: true,
    options: ["Jw1", "Jw2", "Jw3", "Jw4", "Jw5"],
    zoomScale: 1.1,
    zoomOriginX: "82%",
    zoomOriginY: "68%",
  },
  {
    id: "c",
    label: "C",
    className: "c",
    hasCluster: true,
    options: ["C1", "C2", "C3", "C4", "C5", "C6"],
    zoomScale: 1.8,
  },
  {
    id: "lp",
    label: "Lp",
    className: "lp",
    hasCluster: true,
    options: [
      "Lp₁",
      "Lp¹",
      "Lp2",
      "Lp³",
      "Lp₃",
      "Lp4",
      "Lp5",
      "Lp6",
      "Lp7",
      "Lp⁸",
      "Lp₈",
    ],
    zoomScale: 1.5,
  },
  {
    id: "n",
    label: "N",
    className: "n",
    hasCluster: true,
    options: ["N1", "N2", "N3", "N4", "N5"],
    zoomScale: 1.5,
  },
  {
    id: "g",
    label: "G",
    className: "g",
    hasCluster: true,
    options: ["G1", "G1", "G2"],
    zoomScale: 1.5,
  },
  {
    id: "f",
    label: "F",
    className: "f",
    hasCluster: true,
    options: ["F1", "F2", "F3"],
    zoomScale: 1.5,
  },
];


// fim dos conteudos da tab1 => criação dos pontos dos codigos


// conteudos da tab2 => criação da planilha de códigos
export type Row = {
  id: string;
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
};


export const VOLUMES = [
  "0",
  "0.1",
  "0.2",
  "0.3",
  "0.4",
  "0.5",
  "0.6",
  "0.7",
  "0.8",
  "0.9",
  "1",
];

// fim dos conteudos da tab2 => criação da planilha de códigos