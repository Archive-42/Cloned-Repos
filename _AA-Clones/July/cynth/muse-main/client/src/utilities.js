export const compare = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  
  let comparison = 0;
  nameA > nameB  ?  comparison =1  :  comparison = -1
  
  return comparison
}

export const isNotEmpty = obj => {
  if (!obj) return false;
  return Object.keys(obj).length > 0  ?  true  :  false
}
