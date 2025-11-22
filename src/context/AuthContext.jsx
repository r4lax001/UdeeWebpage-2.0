import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // โหลด user data จาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // ฟังก์ชันดึงข้อมูล users ทั้งหมดจาก localStorage
  const getAllUsers = () => {
    const usersData = localStorage.getItem('usersDatabase');
    if (usersData) {
      try {
        return JSON.parse(usersData);
      } catch (error) {
        console.error('Error parsing users database:', error);
        return [];
      }
    }
    return [];
  };

  // ฟังก์ชันบันทึก users ทั้งหมดลง localStorage
  const saveAllUsers = (users) => {
    localStorage.setItem('usersDatabase', JSON.stringify(users));
  };

  // ตรวจสอบว่า username มีอยู่แล้วหรือไม่
  const isUsernameExists = (username) => {
    const users = getAllUsers();
    return users.some(u => u.username.toLowerCase() === username.toLowerCase());
  };

  // Login function - ตรวจสอบว่า user มีอยู่ในระบบหรือไม่
  const login = (email, password) => {
    const users = getAllUsers();
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      // ไม่เก็บ password ใน current user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, message: 'เข้าสู่ระบบสำเร็จ!' };
    } else {
      return { success: false, message: 'ไม่พบผู้ใช้ในระบบ กรุณาลงทะเบียนก่อน' };
    }
  };

  // Register function - ตรวจสอบ username ซ้ำ
  const register = (userData) => {
    const users = getAllUsers();

    // ตรวจสอบว่า username ซ้ำหรือไม่
    if (isUsernameExists(userData.username)) {
      return { success: false, message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาเลือกชื่ออื่น' };
    }

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const emailExists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น' };
    }

    // เพิ่ม user ใหม่ลงใน database
    const newUser = {
      ...userData,
      id: Date.now(), // สร้าง unique id
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveAllUsers(users);

    // Login user ทันทีหลังจาก register
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'ลงทะเบียนสำเร็จ!' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isUsernameExists, // เพิ่มฟังก์ชันนี้เพื่อให้ component อื่นใช้ได้
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};