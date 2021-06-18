export const objectMapper = (obj1: any, obj2: any) => {
  if (obj2) {
    for (const [key, value] of Object.entries(obj2)) {
      obj1[key] = value;
    }
  } else {
    return;
  }
};
