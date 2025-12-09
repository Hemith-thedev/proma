export function SaveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function GetData(key) {
  const SavedData = localStorage.getItem(key);
  if (SavedData && SavedData !== "undefined") {
    try {
      return JSON.parse(SavedData);
    } catch (e) {
      console.error("Error parsing JSON for key:", key, e);
      return [];
    }
  } else {
    return [];
  }
}

export function SetTitle(title) {
  document.title = `Products & Upgrades | ${title}`;
}

export const generateNewId = (array) => {
  // existing ids
  const existingIds = new Set(array.map((p) => Number(p.id)));
  const MIN_ID = 10000000;
  const MAX_ID = 99999999;
  let newIdNumber;
  let isUnique = false;
  while (!isUnique) {
    newIdNumber = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1)) + MIN_ID;
    if (!existingIds.has(newIdNumber)) {
      isUnique = true;
    }
  }
  return newIdNumber;
};
