import React, { useEffect, useState } from "react";
import { fetchData } from "../../store/api";
import { useTranslation } from "react-i18next";

interface Image {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
}

interface Product {
  id: number;
  price: number | null;
  name: string;
}

interface BocadilloItem {
  id: number;
  priceLabel: {
    id: number;
    label: string[];
  };
  others: {
    id: number;
    name: string;
    prices: (number | null)[];
  }[];
  image: Image[];
}

interface Category {
  id: number;
  name: string;
  title: string | null;
  products: Product[];
  images: {
    id: number;
    image: Image[];
  }[];
  BocadillosItems?: BocadilloItem[];
}

interface ApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    data: {
      id: number;
      category: Category[];
      products: Product[];
      images: {
        id: number;
        image: Image[];
      }[];
      BocadillosItems?: BocadilloItem[];
    }[];
  }[];
}

const Menu: React.FC = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(i18n.language); // Pass the current language
        setData(response);
  
        // Set the first category as active if available
        if (response?.data?.[0]?.data?.[0]?.category?.[0]?.name) {
          setActiveCategory(response.data[0].data[0].category[0].name);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, [i18n.language]);

  const handleBreadcrumbClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const groupedData: {
    [categoryName: string]: {
      [subcategoryTitle: string]: {
        products: Product[];
        image?: Image;
        bocadillos?: BocadilloItem[];
      };
    };
  } = {};

  // Safely process the data with optional chaining
  data?.data?.forEach((item) => {
    item.data?.forEach((subItem) => {
      subItem.category?.forEach((category) => {
        const categoryName = category.name;
        const subcategoryTitle =
          category.title && category.title.trim() ? category.title : "Default";

        if (!groupedData[categoryName]) {
          groupedData[categoryName] = {};
        }
        if (!groupedData[categoryName][subcategoryTitle]) {
          groupedData[categoryName][subcategoryTitle] = { products: [] };
        }

        if (subItem.images?.[0]?.image?.[0]) {
          groupedData[categoryName][subcategoryTitle].image = {
            ...subItem.images[0].image[0],
            url: `${baseUrl}${subItem.images[0].image[0].url}`,
          };
        }

        if (subItem.BocadillosItems) {
          groupedData[categoryName][subcategoryTitle].bocadillos =
            subItem.BocadillosItems.map((bocadillo) => ({
              ...bocadillo,
              image:
                bocadillo.image?.map((img) => ({
                  ...img,
                  url: `${baseUrl}${img.url}`,
                })) ?? [],
            }));
        }

        // Filter out products with null or undefined names
        const validProducts = (subItem.products ?? []).filter(
          (product) => product.name && product.name.trim() !== "",
        );
        groupedData[categoryName][subcategoryTitle].products.push(
          ...validProducts,
        );
      });
    });
  });

  // Fixed breadcrumb order
  const breadcrumbOrder = [
    "Sandwiches",
    "Comidas",
    "Croissants",
    "Bocadillos",
    "Bebidas",
  ];

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl text-center mb-8">Daily Menu</h3>

      {/* Breadcrumbs */}
      <div className="flex justify-center space-x-4 mb-8">
        {breadcrumbOrder.map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => handleBreadcrumbClick(categoryName)}
            className={`${
              activeCategory === categoryName
                ? "text-red-500 underline cursor-pointer text-xl"
                : "text-gray-500 text-xl"
            }`}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {/* Categories */}
      {Object.entries(groupedData).map(([categoryName, subcategories]) => (
        <div
          key={categoryName}
          className={`mb-8 ${activeCategory === categoryName ? "block" : "hidden"}`}
        >
          {Object.entries(subcategories).map(
            ([subcategoryTitle, subcategoryData], index) => (
              <div key={subcategoryTitle} className="mb-6">
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-6`}
                >
                  {/* Subcategory Content */}
                  <div className="w-full md:w-1/2">
                    {subcategoryTitle !== "Default" && (
                      <h3 className="text-xl font-semibold mb-4">
                        {subcategoryTitle}
                      </h3>
                    )}
                    {/* Render Products */}
                    <div className="space-y-4">
                      {subcategoryData.products?.map((product, idx) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center"
                        >
                          <h4 className="text-lg">{`${idx + 1}. ${product.name}`}</h4>
                          <p className="text-gray-600">
                            €
                            {product.price !== null
                              ? product.price.toFixed(2)
                              : "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Render Bocadillos */}
                    {subcategoryData.bocadillos?.map((bocadillo) => (
                      <div key={bocadillo.id} className="mt-6">
                        {/* Bocadillo Price Label */}
                        {bocadillo.priceLabel && (
                          <div className="mt-4 flex justify-end space-x-2">
                            {bocadillo.priceLabel.label.map((label, idx) => (
                              <p key={idx} className="text-gray-600">
                                {label}
                              </p>
                            ))}
                          </div>
                        )}
                        {/* Bocadillo Items */}
                        <div className="space-y-4">
                          {bocadillo.others?.map((item, idx) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center"
                            >
                              <h5 className="text-lg">{`${idx + 1}. ${item.name}`}</h5>
                              <div className="flex space-x-4">
                                {item.prices?.map((price, priceIdx) => (
                                  <p key={priceIdx} className="text-gray-600">
                                    €{price !== null ? price.toFixed(2) : "N/A"}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Bocadillo Image */}
                        {bocadillo.image?.[0]?.url && (
                          <div className="w-full mt-4">
                            <img
                              src={bocadillo.image[0].url}
                              alt={
                                bocadillo.image[0].alternativeText ||
                                "Bocadillo"
                              }
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Subcategory Image */}
                  {subcategoryData.image?.url && (
                    <div className="w-full md:w-1/2">
                      <img
                        src={subcategoryData.image.url}
                        alt={
                          subcategoryData.image.alternativeText ||
                          subcategoryTitle
                        }
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
