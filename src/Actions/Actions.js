export const saveNote = (titleData, data,id) => {
  return {
    type: "Save",
    payload: {
      id: id,
      title: titleData,
      data: data,
    },
  };
};
