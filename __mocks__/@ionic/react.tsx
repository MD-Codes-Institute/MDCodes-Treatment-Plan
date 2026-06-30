import React from "react";

// Mock dos componentes principais do Ionic React
export const IonApp = ({ children, ...props }: any) => (
  <div data-testid="ion-app" {...props}>
    {children}
  </div>
);
export const IonContent = ({ children, ...props }: any) => (
  <div data-testid="ion-content" {...props}>
    {children}
  </div>
);
export const IonHeader = ({ children, ...props }: any) => (
  <div data-testid="ion-header" {...props}>
    {children}
  </div>
);
export const IonToolbar = ({ children, ...props }: any) => (
  <div data-testid="ion-toolbar" {...props}>
    {children}
  </div>
);
export const IonTitle = ({ children, ...props }: any) => (
  <div data-testid="ion-title" {...props}>
    {children}
  </div>
);
export const IonPage = ({ children, ...props }: any) => (
  <div data-testid="ion-page" {...props}>
    {children}
  </div>
);
export const IonButton = ({ children, ...props }: any) => (
  <button data-testid="ion-button" {...props}>
    {children}
  </button>
);
export const IonButtons = ({ children, ...props }: any) => (
  <div data-testid="ion-buttons" {...props}>
    {children}
  </div>
);
export const IonIcon = ({ ...props }: any) => <span data-testid="ion-icon" {...props} />;
export const IonLabel = ({ children, ...props }: any) => (
  <label data-testid="ion-label" {...props}>
    {children}
  </label>
);
export const IonInput = ({ ...props }: any) => <input data-testid="ion-input" {...props} />;
export const IonTextarea = ({ ...props }: any) => (
  <textarea data-testid="ion-textarea" {...props} />
);
export const IonList = ({ children, ...props }: any) => (
  <div data-testid="ion-list" {...props}>
    {children}
  </div>
);
export const IonItem = ({ children, ...props }: any) => (
  <div data-testid="ion-item" {...props}>
    {children}
  </div>
);
export const IonTabs = ({ children, ...props }: any) => (
  <div data-testid="ion-tabs" {...props}>
    {children}
  </div>
);
export const IonTabBar = ({ children, ...props }: any) => (
  <div data-testid="ion-tab-bar" {...props}>
    {children}
  </div>
);
export const IonTabButton = ({ children, ...props }: any) => (
  <button data-testid="ion-tab-button" {...props}>
    {children}
  </button>
);
export const IonRouterOutlet = ({ children, ...props }: any) => (
  <div data-testid="ion-router-outlet" {...props}>
    {children}
  </div>
);
export const IonLoading = ({ ...props }: any) => <div data-testid="ion-loading" {...props} />;
export const IonCard = ({ children, ...props }: any) => (
  <div data-testid="ion-card" {...props}>
    {children}
  </div>
);
export const IonCardHeader = ({ children, ...props }: any) => (
  <div data-testid="ion-card-header" {...props}>
    {children}
  </div>
);
export const IonCardContent = ({ children, ...props }: any) => (
  <div data-testid="ion-card-content" {...props}>
    {children}
  </div>
);
export const IonCardTitle = ({ children, ...props }: any) => (
  <div data-testid="ion-card-title" {...props}>
    {children}
  </div>
);
export const IonModal = ({ children, ...props }: any) => (
  <div data-testid="ion-modal" {...props}>
    {children}
  </div>
);
export const IonBackButton = ({ ...props }: any) => (
  <button data-testid="ion-back-button" {...props} />
);
export const IonMenuButton = ({ ...props }: any) => (
  <button data-testid="ion-menu-button" {...props} />
);
export const IonSearchbar = ({ ...props }: any) => <input data-testid="ion-searchbar" {...props} />;
export const IonSelect = ({ children, ...props }: any) => (
  <select data-testid="ion-select" {...props}>
    {children}
  </select>
);
export const IonSelectOption = ({ children, ...props }: any) => (
  <option data-testid="ion-select-option" {...props}>
    {children}
  </option>
);

// Mock do setupIonicReact
export const setupIonicReact = jest.fn();

// Mock do IonReactRouter - será sobrescrito pelo mock específico
export const IonReactRouter = ({ children, ...props }: any) => (
  <div data-testid="ion-react-router" {...props}>
    {children}
  </div>
);
export const IonSpinner = ({ ...props }: any) => <div data-testid="ion-spinner" {...props} />;
export const IonImg = ({ ...props }: any) => <img data-testid="ion-img" {...props} />;
