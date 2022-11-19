import {User} from "../types/types"
const USER_LOCALSTORAGE_KEY = 'sleact_user';

export function getStoredUser() : User {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: User):void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}