const key = 'GameApp/User';

export const getCurrentUser = () => {
  const found = Object.keys(localStorage).find(value => value === key);

  return found ? JSON.parse(localStorage[key]) : {};
};

export const setCurrentUser = data => {
  localStorage.setItem(key, JSON.stringify(data));
};
