export interface DashboardAction {
  label: string;
  route: string;
  disabled: boolean;
}

export interface DashboardFeedback {
  author: string;
  message: string;
  createdAt: string;
}
