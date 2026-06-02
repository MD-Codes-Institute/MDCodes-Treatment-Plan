import React from "react";

// Mock do IonReactRouter
export const IonReactRouter = ({ children, ...props }: any) => (
  <div data-testid="ion-react-router" {...props}>
    {children}
  </div>
);
