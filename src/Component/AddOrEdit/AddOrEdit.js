import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";

import "quill/dist/quill.snow.css";

import { saveNote } from "../../Actions/Actions";

const AddOrEdit = () => {
  const [inputData, setInputData] = useState();
  const [titleData, setTitleData] = useState("");
  const [notification, setNotification] = useState();
  const [warning, setWarning] = useState(false);
  const quillRef = useRef(null);
  const imageRef = useRef();
  const [quill, setQuill] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.notesReducer.list);
  useEffect(() => {
    const editor = quillRef.current.getEditor();
    setQuill(editor);
    data.map((item) => {
      if (item.id === id) {
        return setInputData(item.data), setTitleData(item.title);
      } else {
        return setInputData("");
      }
    });
  }, []);

  const handleImageButtonClick = (imageData) => {
    const range = quill.getSelection();
    if (range) {
      quill.insertEmbed(range.index, "image", imageData, Quill.sources.USER);
      quill.insertText(range.index + 1, "\n", Quill.sources.USER);
      quill.setSelection(range.index + 2);
    } else {
      alert("Please make sure to have the cursor in the input field");
    }
  };

  const handleVideoButtonClick = (videoData) => {
    const url = prompt("Enter the video URL:");
    if (url) {
      const range = quill.getSelection();
      if (range) {
        quill.insertEmbed(range.index, "video", url, Quill.sources.USER);
        quill.insertText(range.index + 1, "\n", Quill.sources.USER);
        quill.setSelection(range.index + 2);
      } else {
        alert("Please select the position in the editor to insert the audio.");
      }
    }
  };

  const handleAudioButtonClick = (audioData) => {
    const range = quill.getSelection();
    if (range) {
      const url = prompt("Enter the audio URL:");
      if (url) {
        quill.insertEmbed(range.index, "audio", url, Quill.sources.USER);
        quill.insertText(range.index + 1, "\n", "user");
        quill.setSelection(range.index + 2);
      }
    } else {
      alert("Please select the position in the editor to insert the audio.");
    }
  };

  const imageReader = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        handleImageButtonClick(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    imageRef.current.click();
  };

  const goBack = (isSaved) => {
    if (isSaved === "saved") {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        history(-1);
      }, 5000);
    } else {
      let confirmValue = window.confirm("Note Not Saved!");
      if (confirmValue) {
        history(-1);
      }
    }
  };

  const onInformationChange = (value) => {
    setInputData(value);
  };

  const handelTitle = (e) => {
    setWarning(false);
    setTitleData(e.target.value);
  };
  const titleCheck = () => {
    if (!titleData.length) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };

  return (
    <div className="relative">
      {notification ? (
        <div className="absolute z-10 w-full h-full">
          <div className="popup absolute w-[15vw] top-2 left-[30vw] text-center border rounded-xl bg-[#B6FFFA] font-medium text-[#9ADE7B] shadow-lg">
            <h1>Saved</h1>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <FaArrowLeft onClick={() => goBack("back")} />
        </div>
        <div
          className="save-btn bg-[#4285F4] shadow-lg rounded-lg py-2 px-3 text-white w-fit cursor-pointer"
          onClick={() => {
            if (!warning && titleData.length) {
              dispatch(saveNote(titleData, inputData, id), goBack("saved"));
            } else {
              setWarning(true);
            }
          }}
        >
          Save
        </div>
      </div>
      <div className="leading-5" key={id}>
        <div>
          {warning ? (
            <p className="text-red-500">Please Fill This Field </p>
          ) : (
            ""
          )}
          <input
            type="text"
            onBlur={titleCheck}
            onChange={handelTitle}
            value={titleData}
            placeholder="Enter title"
            required
            className="title-input w-full px-5"
          />
        </div>
        <ReactQuill
          theme="snow"
          value={inputData}
          onChange={onInformationChange}
          placeholder="Write something awesome..."
          modules={{ toolbar: [] }}
          ref={quillRef}
          className="h-[45vw]"
        />
      </div>
      <div className="z-100 bottom w-full h-full static flex justify-center items-center gap-4">
        <div className="w-[65px] h-[38px] bg-[#E9F1F6] text-center rounded-lg flex justify-center items-center">
          <button onClick={uploadImage}>
            <FaRegImage className="text-[#579BC3] text-[24px]" />
          </button>
          <input
            type="file"
            multiple={false}
            accept="image/*"
            className="hidden"
            onChange={imageReader}
            ref={imageRef}
          />
        </div>
        <div className="w-[65px] h-[38px] bg-[#E9F1F6] text-center rounded-lg flex justify-center items-center">
          <button onClick={handleVideoButtonClick}>
            <FaVideo className="text-[#579BC3] text-[24px]" />
          </button>
        </div>
        <div className="w-[65px] h-[38px] bg-[#E9F1F6] text-center  rounded-lg flex justify-center items-center">
          <button onClick={handleAudioButtonClick}>
            <FaMicrophone className="text-[#579BC3] text-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrEdit;