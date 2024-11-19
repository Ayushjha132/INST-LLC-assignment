import { Trash2 } from "lucide-react";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from "react";

const schema = z.object({
  title: z.string().min(3, { message: "This field is required*" }),
  author: z.string().min(3, { message: "Author must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characterse" }),
})

type Book = {
  _id: number;
  title: string;
  author: string;
  description: string;
};

type FormData = z.infer<typeof schema>;

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const baseUrl = import.meta.env.VITE_API_URL;

  // Fetch books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {

        const response = await fetch(`${baseUrl}/books`); 
        if (!response.ok) {
          throw new Error('Failed to fetch books.');
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (err: unknown) {
        setError((err as Error).message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book.');
      }

      const newBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
      reset(); // Reset the form after successful submission
    } catch (err: unknown) {
      alert((err as Error).message || 'Something went wrong while adding the book.');
    }
  };


  // Handle book deletion
  const onDelete = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/books/${id}`, { // Replace with your API endpoint
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book.');
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (err: unknown) {
      alert((err as Error).message || 'Something went wrong while deleting the book.');
    }
  };

  if (loading) {
    return <div className="m-6 md:m-10 lg:m-14">Loading...</div>;
  }

  if (error) {
    return <div className="m-6 md:m-10 lg:m-14 text-red-600">Error: {error}</div>;
  }

  return (
    <section className="m-6 md:m-10 lg:m-14 ">
      <h3 className="text-xl font-medium text-center py-3">INST LLC Assignment</h3>
      <div className="flex flex-col space-y-5 ">

        {/* FORM TO ADD BOOK */}
        {/* form for ADD NEW BOOK */}
        <div className="flex flex-col md:flex-row ">
          <form onSubmit={handleSubmit(onSubmit)} method="post" className="w-full">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 ">
              <div className="flex flex-col w-full">
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Book Title"
                  className="pl-5 border border-black rounded-md py-2"
                />
                {errors.title && typeof errors.title.message === 'string' && (
                  <p className="text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <input {...register("author")} type="text" className="pl-5 border border-black rounded-md py-2" placeholder="Author Name" />
                {errors.author && typeof errors.author.message === 'string' && (
                  <p className="text-red-600">{errors.author.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <input {...register("description")} className="pl-5 border border-black rounded-md py-2 w-full" placeholder="Add description about the book" />
                {errors.description && typeof errors.description.message === 'string' && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </div>
              <div className="flex flex-col md:w-fit ">
                <button disabled={isSubmitting} className="py-2 px-8 bg-black text-white text-lg rounded-md " type='submit'>{isSubmitting ? 'Loading..' : 'Submit'}</button></div>
            </div>
          </form>
        </div>


        {/* LiST OF BOOKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* list of books from the backend and DELETE BUTTON*/}
          {
            books.map(data =>
              <div key={data._id} className="space-y-1 px-8 py-4 rounded-md bg-gray-300 relative">

                {/* IMAGE use just for ui */}
                <img src="/default-image.png" className="w-full" />
                <h3 className="text-gray-950 text-2xl font-bold">{data.title}</h3>
                <h4 className="text-gray-900 text-lg font-medium">Author: <span className="italic">{data.author}</span></h4>
                <p className="text-gray-800 font-normal">{data.description}</p>
                {/*  delete button and used lucid icons for beautiful icon */}
                <button className="absolute top-0 right-0 pr-5 pt-3" onClick={() => onDelete(data._id)}>{<Trash2 className="text-red-600 hover:text-red-500 w-8 h-8" />}</button>
              </div>
            )
          }

        </div>
      </div>

    </section>
  )
}

export default App;