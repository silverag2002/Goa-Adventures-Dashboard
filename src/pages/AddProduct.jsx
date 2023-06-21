import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import JoditEditor from "jodit-react";

const AddProduct = () => {
  const theme = useTheme();
  const editor1 = useRef();
  const getSunEditor1Instance = (sunEditor) => {
    editor1.current = sunEditor;
    console.log(" editor.current ", editor1.current);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Product" subtitle="List a new product" />
      <Box mt="1.5rem">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter your product title"
              className="p-2 w-full"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Category</label>
              <select
                type="text"
                className="w-full p-2 text-black text-base font-semibold"
              >
                <option value="activity">Activity</option>
                <option value="tour">Tour</option>
              </select>
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category_type">Category Type</label>
              <select
                type="text"
                className="w-full p-2 text-black text-base font-semibold"
              >
                <option value="scuba diving">Activity</option>
                <option value="watersports">Watersports</option>
                <option value="bangee-jumping">Bangee Jumping</option>
              </select>
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category_type">Duration</label>
              <input
                type="time"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
          </div>
          <div>
            <JoditEditor
              height={100}
              name="highlight"
              getSunEditorInstance={getSunEditor1Instance}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="highlight">Highlight</label>
              <textarea rows={8} className="w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="inclusion">Inclusion</label>
              <textarea rows={8} className="w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="exclusion">Exclusion</label>
              <textarea rows={8} className="w-full" />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Min People</label>
              <input
                type="number"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Max People</label>
              <input
                type="number"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Booking Period</label>
              <input
                type="number"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category_type">Partial Deposit</label>
              <select
                type="text"
                className="w-full p-2 text-black text-base font-semibold"
              >
                <option value="yes">Allow</option>
                <option value="no">Disallow</option>
              </select>
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Deposit Percent</label>
              <input
                type="number"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="category">Discount Percent</label>
              <input
                type="number"
                className="w-full p-2 text-black text-base font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col items-start w-full ">
              <label htmlFor="feature-img">Featured Image</label>
              <input type="file" className="w-full p-2" />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="gallery-img">Gallery Image</label>
              <input type="file" multiple className="w-full p-2" />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="video">Video</label>
              <input type="url" className="w-full p-2" />
            </div>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
