import img1 from "../assets/menu-sandwich.png";
import img2 from "../assets/menu-sandwiches-02.jpg";
import img3 from "../assets/menu-Croissants.png";
import img5 from "../assets/menu-comidas-01.jpg";
import img6 from "../assets/menu-comidas-02.jpg";
import img7 from "../assets/menu-comidas-03.jpg";
import img8 from "../assets/menu-bocadillos-01.png";
import img9 from "../assets/menu-bocadillos-02.jpg";
import img10 from "../assets/menu-bocadillos-03.jpg";
import img11 from "../assets/menu-bebidas-01.jpg";
import img12 from "../assets/menu-bebidas-02.jpg";
import img13 from "../assets/menu-bebidas-03.jpg";
import img14 from "../assets/menu-bebidas-04.jpg";

interface DailyMenuItem {
  name: string;
  price: number | number[];
}

interface DailyMenuCategory {
  img: string[];
  priceLabels?: string[];
  items: DailyMenuItem[][];
}

interface DailyMenuSection {
  [subcategory: string]: DailyMenuCategory;
}

export const dailyMenuData: Record<string, DailyMenuSection> = {
  Sandwiches: {
    SALADOS: {
      img: [img1],
      items: [
        [
          { name: "Jamón y queso", price: 3.2 },
          { name: "Bacon y queso", price: 3.6 },
          { name: "Atún y tomate", price: 3.6 },
          {
            name: "Vegetal (pepino, cebolla, lechuga, tomate, zanahoria y huevo).",
            price: 3.9,
          },
          {
            name: "Marinero (salmón ahumado, queso crema, lechuga y tomate).",
            price: 6.5,
          },
          {
            name: "Campestre (lomo en aceite, queso, lechuga y tomate).",
            price: 6.0,
          },
          {
            name: "Especial Amanda triple (york, pollo, bacon, lechuga, tomate, huevo, queso y cebolla caramelizada).",
            price: 10.0,
          },
        ],
      ],
    },
    DULCES: {
      img: [img2],
      items: [
        [
          { name: "Nutella.", price: 3.0 },
          { name: "Dulce de leche.", price: 3.0 },
          {
            name: "Bananero (queso crema, plátano, dulce de leche y canela).",
            price: 5.6,
          },
          {
            name: "Mucho love (nutella con frutos rojos y sirope de fresa).",
            price: 5.6,
          },
          {
            name: "Saludable (miel, frutas frescas y frutos secos).",
            price: 6.0,
          },
        ],
      ],
    },
  },
  Comidas: {
    "ABRIMOS EL APETITO": {
      img: [img5],
      items: [
        [
          { name: "Tapa gourmet individual.", price: 1.5 },
          { name: "Cuenco de aceitunas.", price: 2.0 },
          { name: "Mini Burger.", price: 3.0 },
          { name: "Queso manchego con piquitos.", price: 9.0 },
          { name: "Nachos con guacamole y queso fundido.", price: 8.5 },
          { name: "Patatas fritas caseras.", price: 4.0 },
          { name: "Ensalada de tomate con aguacate.", price: 10.0 },
          { name: "Ensalada mixta con atún.", price: 8.5 },
        ],
      ],
    },
    "PASAMOS A LO BUENO": {
      img: [img6, img7],
      items: [
        [
          { name: "Burger simple de pollo con queso.", price: 4.5 },
          {
            name: "Burger de pollo completa (lechuga, tomate, queso, bacon, huevo y cebolla caramelizada).",
            price: 7.5,
          },
          {
            name: "Burger simple de ternera madurada con queso.",
            price: 5.0,
          },
          {
            name: "Burger completa de ternera madurada (lechuga, tomate, queso, bacon, huevo y cebolla caramelizada).",
            price: 9.5,
          },
          {
            name: "Hot dog (salchicha alemana, cebolla caramelizada, mostaza, cebolla crujiente y salsa barbacoa).",
            price: 7.0,
          },
        ],
        [
          {
            name: "Wrap de pollo (queso crema, lechuga, tomate, cebolla caramelizada).",
            price: 6.5,
          },
          {
            name: "Wrap vegetal (queso crema, ensalada gourmet, verduras horneadas, tomate y cebolla caramelizada).",
            price: 7.0,
          },
          {
            name: "Wrap de salmón (salsa de guacamole, lechuga, tomate y cebolla caramelizada).",
            price: 7.0,
          },
          { name: "Pizzas.", price: 7.0 },
          {
            name: "Plato 'La Granja' (patatas fritas, pimientos, huevos, morcilla y pollo).",
            price: 14.5,
          },
          {
            name: "Plato campestre (patatas fritas, huevos y verduras horneadas).",
            price: 12.5,
          },
        ],
      ],
    },
  },
  Croissants: {
    "CROISSANTS RELLENOS": {
      img: [img3],
      items: [
        [
          {
            name: "Jamón serrano, queso crema, tomate y lechuga.",
            price: 5.0,
          },
          {
            name: "Salmón ahumado, queso crema, aguacate y lechuga.",
            price: 6.9,
          },
          {
            name: "Bacon, salsa de queso chedar, tomate y huevo.",
            price: 5.0,
          },
          { name: "Pollo, queso, tomate, huevo y lechuga.", price: 6.0 },
          { name: "Mixto ( mantequilla, queso, jamón york).", price: 3.5 },
          { name: "Atún, tomate, lechuga y queso.", price: 4.0 },
        ],
      ],
    },
  },
  Bocadillos: {
    a: {
      img: [img8, img9, img10],
      priceLabels: ["Pitufo", "Mollete"],
      items: [
        [
          { name: "Aceite.", price: [2.2, 3.0] },
          { name: "Aceite y tomate.", price: [2.5, 3.2] },
          { name: "Aguacate, aceite y tomate.", price: [2.5, 5.0] },
          { name: "Mantequilla y mermelada", price: [2.1, 3.5] },
          { name: "Mixto", price: [2.5, 4.0] },
          { name: "Catalana", price: [2.8, 4.5] },
          { name: "Catalane con aguacate", price: [3.8, 6.0] },
        ],
        [
          { name: "Bacon y queso.", price: [2.8, 4.0] },
          { name: "Atún y tomate.", price: [2.9, 4.5] },
          { name: "Atún, aguacate, queso y tomate.", price: [4.0, 5.9] },
          { name: "Tortilla, queso y tomate", price: [3.5, 5.5] },
          { name: "Pollo, queso, lechuga y mayonesa.", price: [3.5, 5.5] },
          { name: "Lomo adobado, tomate y mayonesa.", price: [3.5, 5.5] },
          {
            name: "Salmón ahumado, lechuga, tomate y salsa de guacamole.",
            price: [4.0, 6.5],
          },
        ],
        [
          {
            name: "Salmón ahumado, queso crema, aguacate, lechuga, tomate y huevo.",
            price: [5.0, 8.0],
          },
          { name: "Bacon, queso, tomate y huevo.", price: [3.5, 4.5] },
          { name: "Queso manchego, aceite y tomate.", price: [3.0, 5.0] },
          {
            name: "Queso manchego, jamón serrano, aceite y tomate.",
            price: [3.5, 5.5],
          },
          {
            name: "Lomo en aceite, tomate, lechuga, queso, huevo y mayonesa.",
            price: [4.0, 6.0],
          },
          {
            name: "Verduritas homeadas con queso, huevo y tomate.",
            price: [4.0, 6.0],
          },
        ],
      ],
    },
  },
  Bebidas: {
    a: {
      img: [img11, img12, img13],
      items: [
        [
          { name: "Agua pequeña", price: 0.8 },
          { name: "Agua Grande", price: 1.5 },
          { name: "Zumo", price: 1.5 },
          { name: "Refresco", price: 1.5 },
          { name: "Cerveza 25Cl", price: 1.0 },
          { name: "Cerveza 33Cl", price: 1.5 },
          { name: "Alhambra verde", price: 3.0 },
          { name: "Ladrón de manzana", price: 2.0 },
        ],
        [
          { name: "Tinto con limón", price: 2.5 },
          { name: "Copa de vino", price: 3.0 },
          { name: "Botella vino de la casa", price: 12.0 },
          { name: "Botella vino especial", price: 18.0 },
          { name: "Chupitos", price: 2.0 },
          { name: "Monster", price: 2.8 },
          { name: "Combinados", price: 6.0 },
        ],
        [
          { name: "Té e infusiones", price: 1.5 },
          { name: "Té orgánico", price: 2.0 },
          { name: "Café pequeño", price: 1.3 },
          { name: "Café Grande", price: 1.5 },
          { name: "Café con bebida vegetal", price: 1.6 },
          { name: "Carajillo", price: 2.8 },
          {
            name: "Vaso de leche de vaca o vegetal con cereales integrales",
            price: 3.5,
          },
          {
            name: "Vaso de leche de vaca o vegetal con frutos secos, arándanos frescos y cereales integrales. Opción para endulzar: Canela, Cacao puro, Miel y Azúcar.",
            price: 6.0,
          },
        ],
      ],
    },
    "COMBINACIÓN PERFECTA PARA EL CAFÉ": {
      img: [img14],
      items: [
        [
          { name: "Bollería", price: 1.5 },
          { name: "Tarta de zanahoria", price: 4.0 },
          { name: "Tarta de queso", price: 4.0 },
          { name: "Coulant de chocolate", price: 4.0 },
          { name: "Fruta de temporada desde", price: 0.8 },
        ],
      ],
    },
  },
};
