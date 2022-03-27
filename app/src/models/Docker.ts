export interface Container {
  id: string;
  isBuild: boolean;
  status: ContainerStatus;
}

export type ContainerStatus =
  | 'unknown'
  | 'exited'
  | 'running'
  | 'restarting'
  | 'paused'
  | 'missing';
