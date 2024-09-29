export function getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  
  export function setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  