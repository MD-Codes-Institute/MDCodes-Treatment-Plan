interface ModalActionsProps {
  children: React.ReactNode;
}

const ModalActions: React.FC<ModalActionsProps> = ({ children }) => {
  return (
    <footer className="sticky bottom-0 px-4 bg-(--ion-background-containers) flex flex-row gap-5 justify-start items-center py-5 w-full">
      {children}
    </footer>
  );
};

export default ModalActions;
