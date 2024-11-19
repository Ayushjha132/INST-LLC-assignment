import { Link } from "react-router-dom";

export default function ErrorPage (){
    return (
        <>
        <div className="flex flex-col items-center justify-center space-y-2 h-screen">
            <h3 className="text-gray-800  font-extrabold text-4xl">404</h3>
            <p className="text-gray-600">Page not Found</p>

            <Link to={"/books"} className="py-3 px-8 bg-black text-white text-lg rounded-md ">Books</Link>
        </div>
        </>
    )
}