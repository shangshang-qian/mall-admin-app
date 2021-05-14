import Cookie from 'js-cookie';

export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookie.set(arr[i][0], arr[i][1]);
  }
  return true;
}

export function removeCookie() {
  Cookie.remove('username');
  Cookie.remove('appkey');
  Cookie.remove('role');
  Cookie.remove('email');
  return true;
}

// 获取cookie
export function getCookie() {
  return {
    appkey: Cookie.get('appkey'),
    username: Cookie.get('username'),
    role: Cookie.get('role'),
    email: Cookie.get('email'),
  };
}
