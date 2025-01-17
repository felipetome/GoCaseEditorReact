import React from "react";
import ReactDOM from "react-dom/client";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";

import { createStore } from "polotno/model/store";

const store = createStore({
  key: "dRKuSk2VVB8YSm0i6Vdx", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: false,
});
const page = store.addPage();

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <div
          style={{
            display: "flex",
            height: "100%",
            margin: "auto",
            flex: 1,
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Toolbar store={store} />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </div>
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

// default API of your editor
export const createEditor = ({ container }) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App store={store} />);
};

// make API global for simple start in development
window.createEditor = createEditor;
