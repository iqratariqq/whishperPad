import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axious.js";
import toast from "react-hot-toast";
import { ArrowLeft, LoaderIcon, TrashIcon } from "lucide-react";

const NoteDetail = ({ note }) => {
  const [issavedairy, setisavedairy] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [diary, setdairy] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setdairy(res.data);
        toast.success("your diary updated");
      } catch (error) {
        console.log("error in updation", error);
        toast.error("failed to update your thoughts");
      } finally {
        setisloading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handledelete = async () => {
    if (!window.confirm("are you want to remove your thought 😒?"))return
      try {
        await api.delete(`/notes/${id}`);
        toast.success("successfuly deleted");
        navigate("/");
      } catch (error) {
        console.log("error in deletion", error);
        toast.error("error in deletion");
      }
  };
  const handlesave = async () => {
    try {
      await api.put(`/notes/${id}`, diary);
      toast.success("successfuly update...😊");
      navigate("/");
    } catch (error) {
      console.log("error in updation", error);
      toast.error("error in updation");
    }
  };

  if (isloading) {
    return (
      <div className="min-h-screen flex bg-base-200 justify-center text-center items-center ">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className=" container mx-auto py-4 px-4  ">
        <div className=" max-w-2xl mx-auto ">
          <div className="flex justify-between items-center mb-6">
            <Link to={"/"} className="btn btn-ghost ">
              <ArrowLeft className="size-5" />
              Back to Home
            </Link>
            <button
              onClick={handledelete}
              className="btn btn-error btn-outline "
            >
              <TrashIcon className="size-4" />
              Delete Thought
            </button>
          </div>
          <div className="card  bg-base-100 my-20">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="diary Title"
                  className="input input-bordered"
                  value={diary?.title || ""}
                  onChange={(e) =>
                    setdairy({ ...diary, title: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="diary Content"
                  className="textarea textarea-bordered"
                  value={diary?.content || ""}
                  onChange={(e) =>
                    setdairy({ ...diary, content: e.target.value })
                  }
                />
              </div>
              <div className="card-action flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={issavedairy}
                  onClick={handlesave}
                >
                  {issavedairy ? "saving...." : "save thoughts"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
