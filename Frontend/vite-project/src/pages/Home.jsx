import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import RateLimited from "../Components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../Components/NoteCard";
import api from "../lib/axious";
import NoDairy from "../Components/NoDairy";

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [note, setnote] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        console.log(note.length);
        setnote(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch notes");
        if (error.response.status === 429) {
          setIsRateLimited(true);
        }
      } finally {
        setisloading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}

      <div className="mx-w-7xl mx-auto p-4 mt-6">
        {isloading && (
          <div className="text-center text-pretty py-6"> Data Loading ....</div>
        )}

        {note.length === 0 && !isloading && !isRateLimited && <NoDairy />}

        {note.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-6">
            {note.map((note) => {
              return <NoteCard key={note._id} note={note} setnote={setnote} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
