import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatdate } from "../lib/utilis.js";
import api from "../lib/axious.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setnote }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this nodte")) return;

    try {
      api.delete(`/notes/${id}`);
      setnote((prev) => prev.filter((note) => note._id !== id));
      toast.success("succussfully deleted");
    } catch (error) { 
      console.log("deletion error", error);
      toast.error("failed to delete this note");
    }
  };
  return (
    <Link
      to={`/noteDetail/${note._id}`}
      className=" bg-base-200/30 border-solid hover:shadow-lg transition-all   duration-100 border-t-4 border-primary/40 shadow-sm rounded-xl mt-4 mb-4"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/85 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between text-center mt-4">
          <span className="text-sm text-base-content/60 ">
            {formatdate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className=" btn btn-ghost "
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 " />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
