"use client";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef<HTMLFormElement>(null);
  const params = useParams();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value, e.target.name);
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) =>
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        })
      );
    }
  }, []);

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!params.id) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("description", product.description);
      if (file) {
        formData.append("image", file);
      }
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      form.current?.reset();
    } else {
      const res = await axios.put(`/api/products/${params.id}`, product);
      console.log(res);
    }
    form.current?.reset();
    router.refresh();
    router.push("/products");
  };
  return (
    <div className="flex justify-center">
      <form
        action=""
        className="bg-gray-50 rounded-md shadow px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="Name"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
        />
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="00.00"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
        />
        <label htmlFor="name" className=" text-gray-700 text-sm font-bold mb-2">
          Product Description
        </label>
        <textarea
          type="text"
          name="description"
          value={product.description}
          placeholder="Description"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
        />
        <div className="flex flex-col">
          <label
            htmlFor="productImage"
            className="text-gray-700 text-sm font-bold mb-2"
          >
            Product Image
          </label>
          <input
            type="file"
            className="block shadow border rounded py-2 p-3 mb-3 text-gray-800 hover:cursor-pointer bg-blue-100"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {file && (
            <img
              className="w-96 object-contain my-4 mx-auto"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
