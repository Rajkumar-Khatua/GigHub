import { useReducer, useState } from "react";
import "./add.scss";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/cloudenaryUpload/upload.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";

function add_New() {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  console.log(state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs/", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/mygigs")
  };
  return (
    <div className="add">
      <div className="container">
        <h1 className="title">Add a new Product</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g I'll Do whatever you want!"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cats" onChange={handleChange}>
              <option value="select">Select</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="software">Software Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="painting">Painting</option>
              <option value="illustration">Illustration</option>
              <option value="graphics & design">Graphics & Design</option>
              <option value="writing and translating">
                Writing and translating
              </option>
              <option value="ai services">AI services</option>
              <option value="digital marketing">Digital marketing</option>
              <option value="Programming and tech">Programming and tech</option>
              <option value="Business Lifestyle">Business Lifestyle </option>
            </select>

            <div className="images">
              <h2>Images section</h2>
              <div className="imgagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">"Upload" Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} className="upload-btn">
                {uploading ? "uploading" : "Upload"} <CloudUploadIcon />
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              id=""
              cols="30"
              rows="4"
              name="desc"
              placeholder="Brief introduction about your service"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>
              Create <CallMadeIcon fontSize="small" />
            </button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g Single Page Web Site"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              id=""
              cols="30"
              rows="10"
              name="shortDesc"
              placeholder="Short Description about your Service"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time(e.g. 5 days</label>
            <input
              type="number"
              id=""
              min={1}
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              id=""
              min={1}
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="addForm" onSubmit={handleFeature}>
              <input
                type="text"
                placeholder="Setting Domain and hosting"
                onChange={handleChange}
              />
              <button className="upload-btn" type="submit">
                add <AddCircleIcon />
              </button>
            </form>
            <div className="addedFeature">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className="cancel"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input
              type="number"
              id=""
              placeholder="e.g. $50"
              name="price"
              onChange={handleChange}
            />
            <label htmlFor="">Discount</label>
            <input type="number" name="" id="" placeholder="e.g. $50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default add_New;
