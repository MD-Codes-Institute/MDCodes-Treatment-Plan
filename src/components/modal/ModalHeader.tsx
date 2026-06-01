interface PropsModalHeader {
  children: React.ReactNode;
}

const ModalHeader: React.FC<PropsModalHeader> = ({ children }) => {
  return <header className="w-full px-10 flex items-center justify-center gap-5 h-[10vh]">{children}</header>;
};

export default ModalHeader;
