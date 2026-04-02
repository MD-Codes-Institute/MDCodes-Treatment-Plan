export const volumes = ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"];
export const products = ["VM", "VX", "VL", "VB", "BTX", "HACA", "SKV"];
// conteudos da tab2 => criação da planilha de códigos
export type Row = {
  id: string;
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
};
export interface InfosCodeList {
  code: string;
  region: string;
}
export interface PropsModal {
  codeList: InfosCodeList[];
}

// fim dos conteudos da tab2 => criação da planilha de códigos
