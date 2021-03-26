export const GUEST_ROUTES = [
  {
    name: 'Login',
    path: 'http://localhost/api/auth/discord/login',
  }
];

export const AUTHORIZED_ROUTES = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    authorized: true,
  },
  {
    name: 'Settings',
    path: '/settings',
    authorized: true,
  }
];

export const ADMINISTRATOR_ROUTES = [
  {
    name: 'Administrator',
    path: '/administrator',
    authorized: true,
    admin: true
  }
];