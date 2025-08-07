import axios from "axios";
import { LucideArrowLeftFromLine } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axious";

const CreateNote = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("all fields are required");
      return;
    }
    setisloading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfuly");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error(`you're going too fast,slow Down`, {
          duration: 4000,
          icon: "💀",
        });
      } else {
        console.log("error", error);
        toast.error("failed to create note");
      }
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 y-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6 mt-4">
            <LucideArrowLeftFromLine className="size-5" />
            Back to Note
          </Link>
          <div className="card bg-primary/5">
            <div className="card-body border border-orange-50">
              <h2 className="card-title text-2xl mb-4 "> Create New Note</h2>
              <form onSubmit={handlesubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Note Content"
                    className="textarea textarea-bordered"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  />
                </div>
                <div className="card-action flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isloading}
                  >
                    {isloading ? "Creating...." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
