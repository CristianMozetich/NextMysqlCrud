"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
type ButtonsProps = {
  productId: number;
};

const Buttons = ({ productId }: ButtonsProps) => {
  const router = useRouter();
  return (
    <div>
      <div className="gap-2 flex justify-end mt-2">
        <button className="bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded hover:cursor-pointer text-white">
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded hover:cursor-pointer text-white"
          onClick={async () => {
            const res = await axios.delete(
              `http://localhost:3000/api/products/${productId}`
            );
            if (res.status === 204) {
              router.push("/products");
              router.refresh();
            }
            return res;
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Buttons;
