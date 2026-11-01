export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export type IssuePriority = 'Low' | 'Medium' | 'High';
export type IssueCategory =
  | 'Pothole'
  | 'Garbage Overflow'
  | 'Water Leakage'
  | 'Broken Streetlight'
  | 'Other Infrastructure Issues';

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  lat: number;
  lng: number;
  priority: IssuePriority;
  status: IssueStatus;
  reportedAt: string;
  updatedAt: string;
  history: IssueHistoryEntry[];
};

export type IssueHistoryEntry = {
  timestamp: string;
  action: string;
  detail: string;
};

export type MarkerCategory =
  | 'Traffic'
  | 'Environment'
  | 'Civic Issues'
  | 'Public Utilities'
  | 'Heritage'
  | 'Green Spaces';

export type MapMarker = {
  id: string;
  name: string;
  category: MarkerCategory;
  lat: number;
  lng: number;
  description: string;
  simulated: boolean;
  reading?: string;
  status: 'normal' | 'warning' | 'critical';
};
