import { Link } from "react-router-dom";

export default function Home(){
    return (
        <>
        <div className="flex flex-col items-center justify-center space-y-2 h-screen">
            <h3 className="text-gray-800  font-extrabold text-4xl">Home</h3>
            <p className="text-gray-600">Book listing is on /books route as per assignment</p>

            <Link to={"/books"} className="py-3 px-8 bg-black text-white text-lg rounded-md ">Go to Books</Link>
        </div>
        </>
    )
}