import React from 'react';
import LogoutButton from './LogoutButton';

function TenantDashboard() {
  return (
    <div>
      <h1>This is the Tenant Dashboard</h1>
      {/* Add additional Tenant-specific content here */}
      <LogoutButton/>
    </div>
  );
}

export default TenantDashboard;
