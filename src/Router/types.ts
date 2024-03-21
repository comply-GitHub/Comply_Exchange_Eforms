import React from 'react';

export interface RouteType {
  name: string;
  path: string;
  id: number;
  isPrivate?: boolean;
  Component: React.FC;
  roleName?: any;
}
