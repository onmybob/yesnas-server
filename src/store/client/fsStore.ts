import { create } from "zustand";

//代码编辑器
const useFSCodeStore = create<{
  val: any;
  updateVal: (val: any) => void;
}>((set) => ({
  val: "",
  updateVal: (val) => set({ val }),
}));

// //devName
// const useFSDevNameStore = create<{
//   dev_name: string;
//   text: string;
//   // current_path: string;
//   // pathHistory: string[]; // 用于存储路径历史记录
//   updateDev: (dev_name: string, text: string) => void;
//   // updateCurrentPath: (current_path: string) => void;
//   // getFullPath: () => string;
//   // updateCurrentPathCut: (index: number) => void; // 更改参数类型为 index
// }>((set) => ({
//   dev_name: "test",
//   text: "私人影音",
//   updateDev: (dev_name, text) => set({ dev_name, text }),
// }));

export { useFSCodeStore };
