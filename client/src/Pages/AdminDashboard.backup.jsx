import React from 'react';

const AdminDashboard = () => {
  const handleAddNewAdmin = () => {
    const email = prompt("Enter the email for the new Admin:");
    if (email) {
      alert(`Invitation sent to ${email}. They are now an Admin.`);
    }
  };

  return (
    <div className="hmart-theme d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      
      {/* 1. Mini Sidebar (Advanced Look) */}
      <div className="bg-navy p-3 text-white d-none d-md-block" style={{ width: '250px' }}>
        <h4 className="fw-bold mb-5 mt-2 text-center">NexaMart Admin</h4>
        <div className="d-grid gap-2">
          <button className="btn text-white text-start border-0 shadow-none"><i className="fa fa-home me-2"></i> Dashboard</button>
          <button className="btn text-white text-start border-0 shadow-none"><i className="fa fa-box me-2"></i> Inventory</button>
          <button className="btn text-white text-start border-0 shadow-none"><i className="fa fa-users me-2"></i> Customers</button>
          <button className="btn text-white text-start border-0 shadow-none"><i className="fa fa-cog me-2"></i> Settings</button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-grow-1 p-4 p-md-5">
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold text-navy mb-0">Analytics Overview</h2>
            <p className="text-muted">Welcome back, System Administrator</p>
          </div>
          <button className="btn btn-sky px-4 py-2 fw-bold" onClick={handleAddNewAdmin}>
            <i className="fa fa-user-plus me-2"></i> Register New Admin
          </button>
        </div>

        {/* 3. Advanced Stat Cards */}
        <div className="row g-4 mb-5">
          {/* Card 1 */}
          <div className="col-xl-4 col-md-6">
            <div className="card border-0 shadow-sm p-4 rounded-0 position-relative overflow-hidden">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold">Total Products</h6>
                  <h2 className="fw-bold text-navy mb-0">2,480</h2>
                </div>
                <div className="bg-light p-3 rounded-circle text-navy">
                  <i className="fa fa-box-open fa-2x"></i>
                </div>
              </div>
              <div className="mt-3 small">
                <span className="text-success fw-bold"><i className="fa fa-arrow-up"></i> 12%</span> vs last month
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-xl-4 col-md-6">
            <div className="card border-0 shadow-sm p-4 rounded-0 position-relative overflow-hidden">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold">Active Customers</h6>
                  <h2 className="fw-bold text-navy mb-0">1,242</h2>
                </div>
                <div className="bg-light p-3 rounded-circle text-navy">
                  <i className="fa fa-users fa-2x"></i>
                </div>
              </div>
              <div className="mt-3 small">
                <span className="text-success fw-bold"><i className="fa fa-arrow-up"></i> 5%</span> new registrations
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-xl-4 col-md-6">
            <div className="card border-0 shadow-sm p-4 rounded-0 position-relative overflow-hidden">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold">Total Revenue</h6>
                  <h2 className="fw-bold text-navy mb-0">Rs. 850k</h2>
                </div>
                <div className="bg-light p-3 rounded-circle text-navy">
                  <i className="fa fa-coins fa-2x"></i>
                </div>
              </div>
              <div className="mt-3 small text-muted">Real-time update</div>
            </div>
          </div>
        </div>

        {/* 4. Placeholder for Activity Table */}
        <div className="card border-0 shadow-sm rounded-0">
          <div className="card-header bg-white py-3 border-0">
            <h5 className="mb-0 fw-bold text-navy">Recent Inventory Updates</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 border-0">Product</th>
                    <th className="border-0">Category</th>
                    <th className="border-0">Stock</th>
                    <th className="border-0 text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-4 py-3">Premium Espresso Bean</td>
                    <td>Food & Restaurant</td>
                    <td><span className="badge bg-success">In Stock</span></td>
                    <td className="text-end pe-4"><button className="btn btn-sm btn-light border">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;