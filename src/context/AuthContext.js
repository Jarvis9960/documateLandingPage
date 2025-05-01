import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Super Admin 1', mobile: '1234567890', role: 'Super Admin', restricted: false },
    { id: 2, name: 'Admin 1', mobile: '0987654321', role: 'Admin', restricted: false },
    { id: 3, name: 'Admin 2', mobile: '1122334455', role: 'Admin', restricted: false },
  ]);

  const login = (mobile, otp) => {
    if (otp !== '123456') return { success: false, message: 'Invalid OTP' };
    const admin = admins.find((admin) => admin.mobile === mobile);
    if (!admin) return { success: false, message: 'Admin not found' };
    if (admin.restricted) return { success: false, message: 'You are restricted to login, please contact support' };
    setCurrentAdmin(admin);
    return { success: true };
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  const addAdmin = (mobile, name, role) => {
    const newAdmin = {
      id: admins.length + 1,
      mobile,
      name,
      role,
      restricted: false, // New admins are not restricted by default
    };
    setAdmins([...admins, newAdmin]);
  };

  const updateAdminRole = (adminId, newRole) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, role: newRole } : admin
      )
    );
  };

  const toggleAdminRestriction = (adminId) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, restricted: !admin.restricted } : admin
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentAdmin,
        admins,
        login,
        logout,
        addAdmin,
        updateAdminRole,
        toggleAdminRestriction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};