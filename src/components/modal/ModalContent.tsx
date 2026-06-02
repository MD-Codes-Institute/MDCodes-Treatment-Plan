interface ModalContentProps {
  children: React.ReactNode;
  className: string
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => {
   return <div className={`flex-1 overflow-y-auto flex items-center justify-center h-full w-full  ${className}`}>{children}</div>;
};

export default ModalContent;
