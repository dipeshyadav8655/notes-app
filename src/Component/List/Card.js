import React from "react";

function Card(props) {
  return (
    <div className="w-full mb-6 leading-6 bg-white rounded-xl p-5 overflow-hidden whitespace-nowrap text-ellipsis">
      <div
        className="title w-[20vw] font-medium text-[15px] overflow-hidden whitespace-nowrap text-ellipsis"
        dangerouslySetInnerHTML={{ __html: props.item.title }}
      />
      <div
        className="card-discription h-[3vw] w-[20vw] font-normal text-[13px] overflow-hidden whitespace-nowrap text-ellipsis"
        dangerouslySetInnerHTML={{ __html: props.item.data }}
      />
      <div className="date font-medium text-[10px] text-[#A6A6A6]">
        {props.item.time} <span className="ml-2">{props.item.date}</span>
      </div>
    </div>
  );
}

export default Card;
