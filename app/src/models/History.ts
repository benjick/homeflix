export interface HistorySlot {
  id: number;
  completed: number;
  name: string;
  nzb_name: string;
  category: string;
  pp: string;
  script: string;
  report: string;
  url?: any;
  status: string;
  nzo_id: string;
  storage: string;
  path: string;
  script_log: string;
  script_line: string;
  download_time: number;
  postproc_time: number;
  downloaded: any;
  completeness?: any;
  fail_message: string;
  url_info: string;
  bytes: any;
  meta?: any;
  series: string;
  md5sum: string;
  password?: any;
  action_line: string;
  size: string;
  loaded: boolean;
  retry: number;
}

export interface History {
  total_size: string;
  month_size: string;
  week_size: string;
  day_size: string;
  slots: HistorySlot[];
  noofslots: number;
  last_history_update: number;
  version: string;
}
