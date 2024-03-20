import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { BounceLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs/dist";

export default function ProductForm({
  _id,
  title: existingTilte,
  description: existingDesc,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTilte || "");
  const [description, setDescription] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToPoducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState(assignedCategory || "");
  const [categories, setCategories] = useState([]);
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToPoducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImage(e) {
    e.preventDefault();
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      // files.forEach((file) => data.append("file", file));
      const res = await axios.post("/api/upload", data);
      setImages((prevImages) => {
        return [...prevImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories?.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name}>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(e) => setProductProp(p.name, e.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photes</label>
      <div className="flex flex-wrap mb-2 gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((image) => (
              <div key={image} className="flex mb-2">
                <div className="flex items-center w-24 h-24 rounded-sm shadow-md border border-gray-200">
                  <img src={image} alt="" className="rounded-lg" />
                </div>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="flex items-center h-24">
            <BounceLoader color="blue" />
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-1  w-24 h-24 text-sm text-primary rounded-md bg-white border border-gray-200 shadow-md cursor-pointer">
          <ArrowUpTrayIcon className="w-6 h-6" />
          Add image
          <input type="file" onChange={uploadImage} className="hidden" />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
