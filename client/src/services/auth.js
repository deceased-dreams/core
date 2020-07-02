export function login (username, password) {
  const USERNAME = 'admin';
  const PASSWORD = 'admin';
  return new Promise((resolve, reject) => {
    if (username != USERNAME) {
      return reject('username tidak valid');
    }
    if (password != PASSWORD) {
      return reject('password salah');
    }
    localStorage.setItem('dinastry.username', username);
    return resolve(true);
  });
}

export function currentUser () {
  return localStorage.getItem('dinastry.username');
}

export function logout () {
  localStorage.removeItem('dinastry.username');
}
