
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

import SmartCityMap from '@/pages/SmartCityMap';
import SmartCityMap3D from './pages/SmartCityMap3D';
import CityExplorer from '@/pages/CityExplorer';

import ReportIssue from '@/pages/ReportIssue';
import AdminIssues from '@/pages/AdminIssues';

import PlaceholderPage from '@/components/ui/PlaceholderPage';

export default function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Existing City Map */}
      <Route
        path="/map"
        element={
          <Layout>
            <SmartCityMap />
          </Layout>
        }
      />

      {/* New City Explorer */}
      <Route
        path="/city-explorer"
        element={
          <Layout>
            <CityExplorer />
          </Layout>
        }
      />

      {/* City Explorer Category Results */}
      <Route
        path="/city-explorer/:category"
        element={
          <Layout>
            <CityExplorer />
          </Layout>
        }
      />

      {/* Report Issue */}
      <Route
        path="/report-issue"
        element={
          <Layout>
            <ReportIssue />
          </Layout>
        }
      />

      {/* Admin Issues */}
      <Route
        path="/admin/issues"
        element={
          <Layout>
            <AdminIssues />
          </Layout>
        }
      />

      {/* 3D City Map */}
      <Route
        path="/map-3d"
        element={
          <Layout>
            <SmartCityMap3D />
          </Layout>
        }
      />

      {/* City Overview */}
      <Route
        path="/overview"
        element={
          <Layout>
            <PlaceholderPage
              title="City Overview"
              description="High-level city dashboard and key performance indicators."
              owner="Member 1"
            />
          </Layout>
        }
      />

      {/* My Reports */}
      <Route
        path="/my-reports"
        element={
          <Layout>
            <PlaceholderPage
              title="My Reports"
              description="Track the status of civic issues you have submitted."
              owner="Member 4"
            />
          </Layout>
        }
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={
          <Layout>
            <PlaceholderPage
              title="Analytics"
              description="Trend analysis and data-driven insights across city modules."
              owner="Member 1"
            />
          </Layout>
        }
      />

      {/* Live Monitoring */}
      <Route
        path="/monitoring"
        element={
          <Layout>
            <PlaceholderPage
              title="Live Monitoring"
              description="Real-time sensor feeds and operational dashboards."
              owner="Member 2"
            />
          </Layout>
        }
      />

      {/* Public Utilities */}
      <Route
        path="/utilities"
        element={
          <Layout>
            <PlaceholderPage
              title="Public Utilities"
              description="Water, power, and sanitation utility monitoring."
              owner="Member 2"
            />
          </Layout>
        }
      />

      {/* Transport */}
      <Route
        path="/transport"
        element={
          <Layout>
            <PlaceholderPage
              title="Transport"
              description="Traffic, transit, and mobility management."
              owner="Member 2"
            />
          </Layout>
        }
      />

      {/* Green Spaces */}
      <Route
        path="/green-spaces"
        element={
          <Layout>
            <PlaceholderPage
              title="Green Spaces"
              description="Parks, lakes, and urban canopy management."
              owner="Member 1"
            />
          </Layout>
        }
      />

      {/* Tourism and Heritage */}
      <Route
        path="/heritage"
        element={
          <Layout>
            <PlaceholderPage
              title="Tourism & Heritage"
              description="Heritage site information, visitor flow, and cultural events."
              owner="Member 4"
            />
          </Layout>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <Layout>
            <PlaceholderPage
              title="Settings"
              description="Application preferences and integration configuration."
              owner="All members"
            />
          </Layout>
        }
      />

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
