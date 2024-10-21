import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { ShowKind, UploadAction } from "./common/enums";
import { State } from "./types";

const initialState = {
  navTitle: "",
  fsAddAction: UploadAction.UPLOAD_DIR,
  fsRefreshButtonClicked: false,
  fsCurrentPathList: ["/"],
  fsOrderName: "modify_time",
  fsAscending: false,
  httpLoading: false,
  globalErrorMsg: "",
  fsShowKind: ShowKind.GRID,
  fsDevName: "",
  fsDevId: "",
};
export const useStore = create<State>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    prev: initialState,
    applyMutation: (mutation: Partial<State>) =>
      set((state) => {
        const curr = Object.fromEntries(Object.keys(mutation).map((key) => [key, state[key as keyof typeof state]]));

        return { ...mutation, prev: { ...state.prev, curr } };
      }),
  })),
);
