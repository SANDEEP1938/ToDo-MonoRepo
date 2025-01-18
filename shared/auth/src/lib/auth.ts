export function auth(): string {
  return 'auth';
}

export const loginCheck = async(username: string, password: string) => {
  console.log(username ,'user' , password , 'password')
    if (username === 'user' && password === 'password') {
    localStorage.setItem('session', 'active');
    return 'validUser';
  } else {
    return 'inValidUser';
  }
};

export const userLogout = () => {
  localStorage.removeItem('session');
};