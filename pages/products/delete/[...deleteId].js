import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { deleteId } = router.query;

  useEffect(() => {
    if (!deleteId) return;
    axios
      .get("/api/products?id=" + deleteId)
      .then((res) => setProductInfo(res.data));
  }, [deleteId]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct(e) {
    e.preventDefault();
    await axios.delete("/api/products?id=" + deleteId);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center text-gray-600">
        Do you really want to delete &nbsp;{productInfo?.title}?
      </h1>
      <div className="flex justify-center gap-2">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </Layout>
  );
}
