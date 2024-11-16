export interface File {
  filename: string;
  file_type: string;
  dev_name: string;
  file_path: string;
  is_dir: boolean;
  modify_time: string;
  size_bytes: number;
}
export interface Dev {
  id: string;
  dev_name: string;
  capacity: number;
  used_space: number;
  location: string;
}
export interface TransferNotification {
  id: string;
  action: string;
  src_dir: string;
  dest_dir: string;
  progress: number;
  is_dir: number;
  src_dev_id: string;
  status: string;
  msg: string;
  speed: string;
  create_time: string;
  end_time: string;
}
