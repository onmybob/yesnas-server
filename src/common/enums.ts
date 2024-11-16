/**
 * HTTP request methods
 */
export enum HttpMethods {
  POST,
  GET,
  DELETE,
  PUT,
}

export enum UploadAction {
  NONE,
  NEW_DIR,
  UPLOAD_FILE,
  UPLOAD_DIR,
  NEW_FILE,
}
export enum ShowKind {
  LIST,
  GRID,
}
export enum TransferStatus {
  INIT,
  RUNNING,
  FAIL,
  COMPLETED,
}
export enum TransferAction {
  COPY,
  MOVE,
}
