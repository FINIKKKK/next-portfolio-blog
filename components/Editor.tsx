import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

export type TEditor = {
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
};

export const Editor: React.FC<TEditor> = ({ initialValue, onChange }) => {
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: {
          blocks: initialValue ? initialValue : [],
        },
        placeholder: "Введите текст вашей статьи",
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div id="editor" />;
};
