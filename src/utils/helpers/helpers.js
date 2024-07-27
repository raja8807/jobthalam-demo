export const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const newDate = new Date();

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

