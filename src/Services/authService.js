// Mock user database
let users = JSON.parse(localStorage.getItem('users')) || [];

// Add a test user if no users exist
if (users.length === 0) {
  users = [{
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    createdAt: new Date().toISOString()
  }];
  localStorage.setItem('users', JSON.stringify(users));
}

export const authService = {
  // Register a new user
  register: (userData) => {
    return new Promise((resolve, reject) => {
      // Check if user already exists
      if (users.find(user => user.email === userData.email)) {
        reject({ message: 'User with this email already exists' });
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      };

      // Add to users array
      users.push(newUser);

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      resolve({ message: 'Registration successful' });
    });
  },

  // Login user
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      // Find user
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve({ message: 'Login successful', user });
      } else {
        reject({ message: 'Invalid email or password' });
      }
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}; 