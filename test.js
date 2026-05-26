'use strict';

const BASE = 'http://localhost:5000';

const admin = {
  fullname: 'Admin User',
  email: 'admin@lotus.com',
  password: 'Admin@1234',
  phone: '9999999999',
  role: 'admin',
};

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json() };
}

async function get(path, token) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { status: res.status, data: await res.json() };
}

function log(label, result) {
  const ok = result.status >= 200 && result.status < 300;
  console.log(`\n${ok ? '✅' : '❌'} ${label} [${result.status}]`);
  console.log(JSON.stringify(result.data, null, 2));
  return ok;
}

(async () => {
  console.log('=== Lotus API Test ===\n');

  // 1. Register admin
  const reg = await post('/auth/register', admin);
  log('Register Admin', reg);

  // 2. Login admin
  const login = await post('/auth/login', {
    email: admin.email,
    password: admin.password,
  });
  const loginOk = log('Login Admin', login);

  if (!loginOk) return;

  const token = login.data.data.token;

  // 3. Get own profile
  const profile = await get('/auth/profile', token);
  log('My Profile', profile);

  // 4. Get all users (admin only)
  const users = await get('/auth/users', token);
  log('Get All Users (admin)', users);

  console.log('\n=== Test Complete ===');
})();
