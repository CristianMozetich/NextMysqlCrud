import Link from "next/link";
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};
type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      className="bg-amber-50 border-gray-800 rounded-lg m-4 hover:cursor-pointer hover:bg-gray-100"
      href={`/products/${product.id}`}
    >
      {product.image && <img src={product.image} className="w-40" alt="" />}
      <h1 className="text-blue-950 text-lg font-bold p-2 m-2">
        {product.name}
      </h1>
      <h2 className="text-gray-900 font-bold p-2 m-2">{product.description}</h2>
      <p className="text-gray-900 m-2 p-2">{product.price}</p>
    </Link>
  );
};

export default ProductCard;
