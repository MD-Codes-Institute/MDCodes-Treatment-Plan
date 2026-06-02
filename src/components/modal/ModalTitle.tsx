interface ModalTitle {
  children: React.ReactNode;
  className: string
}

const ModalTitle: React.FC<ModalTitle> = ({ children, className }) => {
  return <h1 className={`text-white ${className}`}>{children}</h1>;
};
export default ModalTitle;
