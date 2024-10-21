import { ShowKind, UploadAction } from "@/common/enums";

// for http requests
export type ErrorResponse = {
  message: string;
  code: 100001;
  data?: null;
};

// for http requests
export type SuccessResponse<T> = {
  message?: string;
  code: 10000;
  data: T;
};

export type State = {
  fsAddAction: UploadAction;
  fsRefreshButtonClicked: boolean;
  // for breadcrumbs
  fsCurrentPathList: string[];
  //order for directories and files
  fsOrderName: string;
  //order is ascending or descending
  fsAscending: boolean;
  //kind of show directory or file
  fsShowKind: ShowKind;
  //current selected storage type
  fsDevName: string;
  fsDevId: string;

  navTitle: string;
  httpLoading: boolean;
  globalErrorMsg: string;

  prev: Omit<State, "applyMutation" | "prev">;
  applyMutation: (mutation: Partial<State>) => void;
};
