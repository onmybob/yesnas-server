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
