export interface Container {
  id: string;
  isBuild: boolean;
  status: ContainerStatus;
  started?: string;
}

export type ContainerStatus =
  | 'unknown'
  | 'exited'
  | 'running'
  | 'restarting'
  | 'paused'
  | 'missing';
