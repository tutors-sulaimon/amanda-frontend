import React, { useEffect, useState } from "react";
import { fetchSubMenuData } from "../../store/api";

interface Category {
  id: number;
  name: string;
  title: string;
}

interface Item {
  id: number;
  name: string;
  price: number | null;
}

interface TableInfo {
  id: number;
  name: string;
}

interface Note {
  id: number;
  name: string;
}

interface Menu {
  id: number;
  category: Category[];
  items: Item[];
  tableInfo: TableInfo[];
  notes: Note[];
}

// Breadcrumb categories in the required order
const BREADCRUMB_CATEGORIES = [
  { id: 1, title: "Para Picar" },
  { id: 2, title: "Buffet Vegetariano" },
  { id: 3, title: "Porción Compartir" },
  { id: 4, title: "Platos Principales" },
  { id: 5, title: "Bebidas" },
];

// Mapping between breadcrumb titles and API category titles
const CATEGORY_TITLE_MAPPING: { [key: string]: string } = {
  "Para Picar": "PARA PICAR",
  "Buffet Vegetariano": "Caterig vegetariano",
  "Porción Compartir": "Nuestras Raciones Para Compartir",
  "Platos Principales": "PLATOS PRNCIPALES",
  Bebidas: "BEBIDAS",
};

// Function to calculate the dynamic year range
const getYearRange = (): string => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1; 

  // Extract the last two digits of the current and next year
  const currentYearShort = String(currentYear).slice(-2); 
  const nextYearShort = String(nextYear).slice(-2); 

  // Return the year range in the format "23/24"
  return `${currentYearShort}/${nextYearShort}`;
};

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    BREADCRUMB_CATEGORIES[0].title,
  ); 

  // Dynamic year range (e.g., "23/24" or "24/25")
  const yearRange = getYearRange(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSubMenuData();
        setMenus(response.data); 
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category click for breadcrumbs
  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle); // Update selected category
  };

  // Filter menus based on the selected category title
  const filteredMenus = menus.filter((menu) =>
    menu.category.some((cat) =>
      cat.title
        .toLowerCase()
        .includes(CATEGORY_TITLE_MAPPING[selectedCategory].toLowerCase()),
    ),
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Dynamic Heading */}
      <h2 className="text-xl text-gray-500 text-center mb-8">
        PRECIOS PARA EVENTOS KIOSCO AMANDA {yearRange}
      </h2>

      {/* Breadcrumbs (centered) */}
      <div className="flex justify-center space-x-4 mb-8">
        {BREADCRUMB_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.title)}
            className={`${
              selectedCategory === cat.title
                ? "text-red-500 underline cursor-pointer text-xl"
                : "text-gray-500 text-xl"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Render content for the selected category */}
      {filteredMenus.length > 0 ? (
        filteredMenus.map((menu) => (
          <div key={menu.id} className="mb-8 p-4">
            <h2 className="text-2xl font-normal mb-4">
              {menu.category && menu.category.length > 0
                ? menu.category.map((cat, index) => {
                    // Split the title into two parts: main text and "Minimo 15 comensales"
                    const [mainText, minComensales] = cat.title.split(
                      ". Minimo 15 comensales",
                    );

                    return (
                      <div key={index} className="mb-6">
                        {/* Render the main text */}
                        <h2 className="text-2xl font-normal mb-2">
                          {mainText
                            .split(" ")
                            .map((word) => {
                              return (
                                word.charAt(0).toUpperCase() + word.slice(1)
                              );
                            })
                            .join(" ")}
                        </h2>

                        {/* Render "Minimo 15 comensales" in its own block if it exists */}
                        {minComensales !== undefined && (
                          <p className="text-center text-gray-600">
                            Minimo 15 comensales
                          </p>
                        )}
                      </div>
                    );
                  })
                : "No Category"}
            </h2>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="flex justify-end">precio unitario</h4>
              {menu.items && menu.items.length > 0 ? (
                menu.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2"
                  >
                    <p className="text-lg text-gray-600">
                      {index + 1}. {item.name} {/* Add numbering to items */}
                    </p>
                    <p className="text-gray-600">
                      {item.price ? `€${item.price.toFixed(2)}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <div>No items available</div>
              )}
            </div>

            {/* Notes */}
            {menu.notes && menu.notes.length > 0 && (
              <div className="mt-4">
                <ul className="pl-5">
                  {menu.notes.map((note) => (
                    <p key={note.id} className="text-gray-600">
                      {note.name}
                    </p>
                  ))}
                </ul>
              </div>
            )}

            {/* Table Info */}
            <div className="mt-4">
              {menu.tableInfo && menu.tableInfo.length > 0 ? (
                menu.tableInfo.map((info) => {
                  // Split the table info into lines
                  const lines = info.name.split("\n");

                  return (
                    <div key={info.id}>
                      <div className="text-sm text-gray-700">
                        {lines.map((line, index) => {
                          // Check if the line starts with "Tarifas adicionales:"
                          if (line.trim().startsWith("Tarifas adicionales:")) {
                            return (
                              <div key={index}>
                                <p className="whitespace-pre-line">{line}</p>
                                {/* Render the next 3 lines as a list */}
                                <p className="list-disc pl-5">
                                  {lines
                                    .slice(index + 1, index + 4) // Get the next 3 lines
                                    .map((tarifaLine, tarifaIndex) => (
                                      <li key={tarifaIndex}>
                                        {tarifaLine.trim()}
                                      </li>
                                    ))}
                                </p>
                              </div>
                            );
                          } else if (
                            // Skip the next 3 lines after "Tarifas adicionales:"
                            index >
                              lines.findIndex((l) =>
                                l.trim().startsWith("Tarifas adicionales:"),
                              ) &&
                            index <=
                              lines.findIndex((l) =>
                                l.trim().startsWith("Tarifas adicionales:"),
                              ) +
                                3
                          ) {
                            // Skip rendering these lines (already handled above)
                            return null;
                          } else {
                            // Render all other lines as paragraphs
                            return (
                              <p key={index} className="mb-2">
                                {line}
                              </p>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No table info available</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No menus available for this category</div>
      )}
    </div>
  );
};

export default MenuList;