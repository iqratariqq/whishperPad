import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoDairy = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first thought to get started on your journey.
      </p>
      <Link to="/createNote" className="btn btn-primary">
        Create Your First Thought
      </Link>
    </div>
  );
};
export default NoDairy