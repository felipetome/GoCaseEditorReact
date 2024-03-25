import React from "react";
import ReactDOM from "react-dom/client";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { Button } from "@blueprintjs/core";
import {
  SidePanel,
  TextSection,
  UploadSection,
  ElementsSection,
  BackgroundSection,
  LayersSection,
} from "polotno/side-panel";
import { observer } from "mobx-react-lite";
import { InputGroup } from "@blueprintjs/core";
import { Workspace } from "polotno/canvas/workspace";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { getImageSize } from "polotno/utils/image";
import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import { createStore } from "polotno/model/store";
import { setTranslations } from "polotno/config";
import { getTranslations } from "polotno/config";
setTranslations({
  sidePanel: {
    text: "Texto",
    createHeader: "Título",
    subHeaderText: "Subtítulo",
    createSubHeader: "Subtítulo",
    createBody: "Texto simples",
    myFonts: "Minhas Fontes",
    elements: "Elementos",
    lines: "Linhas",
    shapes: "Formas",
    searchPlaceholder: "Procurar...",
    layers: "Camadas",
    layersTip: "Elementos ativos na sua arte:",
    noLayers: "Nenhum elemento ativo...",
    uploadTip: "Quer enviar suas próprias imagens?",
    noResults: "Nenhum resultado",
    "uploadImage": "Carregar imagem",
  },
  toolbar: {
    zoomIn: "Mais zoom",
    zoomOut: "Menos zoom",
    resetZoom: "Zoom normal",
    position: "Camada",
    transparency: "Transparencia",
  },
});
console.log(getTranslations());

const store = createStore({
  key: "dRKuSk2VVB8YSm0i6Vdx",

  showCredit: false,
});
store.addPage();
store.setSize(827, 1718, true);

const SaveButton = ({ store }) => {
  return (
    <div>
      <Button
        onClick={() => {
          store.saveAsImage({ fileName: "gocase.png" });
        }}
      >
        Baixar
      </Button>
    </div>
  );
};

export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setImages([
      { url: "https://eu.lovebox.love/cdn/shop/files/Group_214.png" },
      {
        url: "https://cdn.icon-icons.com/icons2/2000/PNG/512/emoji_emoticons_tongue_icon_123404.png",
      },
      {
        url: "https://cdn.icon-icons.com/icons2/3217/PNG/512/like_favorite_thumbs_up_love_icon_196538.png",
      },
      {
        url: "https://cdn.icon-icons.com/icons2/3939/PNG/512/valentines_favorite_romance_love_like_icon_250768.png",
      },
      {
        url: "https://cdn.icon-icons.com/icons2/4188/PNG/512/game_icon_262400.png",
      },
      {
        url: "https://cdn.icon-icons.com/icons2/4188/PNG/512/scary_halloween_dead_danger_skull_gaming_controller_console_game_icon_262396.png",
      },
      {
        url: "https://store-images.s-microsoft.com/image/apps.40052.13730260618871241.e3b9bdc1-5c50-4dc6-a245-2a422e02159b.80ecc01a-4ec6-43a9-b4ec-f04270f53c11?h=464",
      },
    ]);
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Produrar..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: "20px",
        }}
      />

      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
            width,
            height,

            x: pos ? pos.x : store.width / 2 - width / 2,
            y: pos ? pos.y : store.height / 2 - height / 2,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});

const CustomPhotos = {
  name: "Stickers",
  Tab: (props) => (
    <SectionTab name="Stickers" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: PhotosPanel,
};

const sections = [
  UploadSection,
  TextSection,
  CustomPhotos,
  ElementsSection,
  BackgroundSection,
  LayersSection,
];

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            ActionControls: SaveButton,
          }}
        />
        <Workspace store={store} altCloneEnabled={true} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export const createEditor = ({ container }) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App store={store} />);
};

window.createEditor = createEditor;
