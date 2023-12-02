const initialState = {
  list: [],
};
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Save":
      const title = action.payload.title;
      const data = action.payload.data;
      const id = action.payload.id;
      let completeDate;
      let completeTime;
      const newData = state.list.filter((item) => item.id != id);
      var currentDate = new Date();
      var currentTime = new Date();
      var day = currentDate.getDate();
      var month = currentDate.toLocaleString("en-us", { month: "long" });
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      completeTime =
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes;
      completeDate = day + month;
      return {
        ...state,
        list: [
          ...newData,
          {
            title: title,
            data: data,
            time: completeTime,
            date: completeDate,
            id: id,
          },
        ],
      };
    default:
      return state;
  }
};

export default notesReducer;
