import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import emptyState from "../../Assets/Add tasks-bro.svg";

function List() {
  const [loder, setLoder] = useState(true);
  const data = useSelector((state) => state.notesReducer.list);
  const newDataId = data.length + 1;
  useEffect(() => {
    setTimeout(() => {
      setLoder(false);
    }, 3000);
  });

  return (
    <div className="relative">
      {loder ? <Loader /> : ""}
      <div className="Header flex justify-between items-center w-full">
        <p className="font-semibold">Notes</p>
        <Link to={`/notes-app/AddOrEdit/${newDataId}`}>
          <div className="new-btn bg-[#579BC3] rounded-lg py-2 px-3 text-white w-fit">
            +New
          </div>
        </Link>
      </div>
      {data.length ? (
        data.map((item) => {
          return (
            <div className="List mx-[2vw] mt-[2vw] rounded-xl" key={item.id}>
              <Link to={`/notes-app/AddOrEdit/${item.id}`}>
                <Card item={item} />
              </Link>
            </div>
          );
        })
      ) : (
        <div className="m-[5vw] text-center w-full">
          <img
            src={emptyState}
            alt="Empty-State"
            className=" empty-state-image w-[20vw]"
          />
          <div>
            <p className="ml-[-20vw] text-[#407BFF]">
              Your Notes Will Appear Hear
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
