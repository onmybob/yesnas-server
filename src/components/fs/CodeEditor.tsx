/**
 *  Editor component for various file types such as txt, sh, conf, toml, etc.
 */
"use client";
import { Dev } from "@/common/models/fs";
import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";

export const CodeEditor = ({ data, setCode, dev, file_type }: { file_type: string; dev: Dev; data: string; setCode: (value: string) => void }) => {
  const languageMap: { [key: string]: () => any } = {
    xml: langs.xml,
    yaml: langs.yaml,
    conf: langs.nginx,
    txt: langs.less,
    toml: langs.toml,
    sh: langs.shell,
  };

  const language = languageMap[file_type] ? languageMap[file_type]() : langs.shell();

  let myTheme = EditorView.theme({
    ".cm-content": {
      caretColor: "#0e9",
    },

    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074",
    },
    ".cm-gutters": {
      color: "#b0b0b0",
      border: "none",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
  });

  return (
    <CodeMirror value={data} extensions={[language]} theme={myTheme} style={{ borderRight: "none" }} className="border-none" height="500px" width="800px" onChange={setCode} />
  );
};
