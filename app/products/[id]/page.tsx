import axios from "axios";
import Buttons from "./Buttons";

type Params = {
  params: {
    id: string;
  };
};

async function loadProduct(id: string) {
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
  return data;
}
export default async function ProductPage({ params }: Params) {
  const { id } = await params;

  const product = await loadProduct(id);
  console.log(product);

  return (
    <section className="flex justify-center items-center">
      <div className="flex items center flex-col bg-white text-gray-800 p-6 rounded">
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <Buttons productId={product.id} />
      </div>
    </section>
  );
}
