import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const products = [
  {
    id: "0001",
    name: "Грецкий орех кондитерский",
    weight: 40,
    currentPrice: 30,
    oldPrice: 35,
    itemFlag: "sale",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, сахар. Идеально подойдет для выпечки",
    energyValue: "654",
    tasteTags: ["sweet", "confectionery", "purified"],
  },
  {
    id: "0002",
    name: "Грецкий орех в глазури",
    weight: 40,
    currentPrice: 30,
    oldPrice: 35,
    itemFlag: "new",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, мед гречаный. Идеально  при простуде",
    energyValue: "330",
    tasteTags: ["honey", "sweet", "purified"],
  },
  {
    id: "0003",
    name: "Грецкий орех соленый",
    weight: 40,
    currentPrice: 30,
    oldPrice: 35,
    itemFlag: "basic",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, сахар. Идеально подойдет для выпечки",
    energyValue: "300",
    tasteTags: ["confectionery", "purified"],
  },
  {
    id: "0004",
    name: "Грецкий орех с молочным вкусом",
    weight: 40,
    currentPrice: 30,
    oldPrice: 35,
    itemFlag: "basic",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, дробленое в мелкую фракцию. Со вкусом топленого молока",
    energyValue: "480",
    tasteTags: ["sweet", "purified"],
  },
  {
    id: "0005",
    name: "Грецкий орех в медовой глазури",
    weight: 40,
    currentPrice: 56,
    oldPrice: 80,
    itemFlag: "basic",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, дробленое в мелкую фракцию. Со вкусом гречаного меда",
    energyValue: "654",
    tasteTags: ["honey", "sweet", "purified"],
  },
  {
    id: "0006",
    name: "Грецкий орех соленый",
    weight: 40,
    currentPrice: 30,
    oldPrice: 35,
    itemFlag: "basic",
    composition:
      "Ядро грецкого ореха, вымытого очищенного от кожуры, сахар. Идеально подойдет для выпечки",
    energyValue: "438",
    tasteTags: ["confectionery", "purified"],
  },
];

export async function addProducts() {
  try {
    for (const product of products) {
      const item = doc(db, "products", product.id);
      await setDoc(item, product);
    }
    console.log("Products added successfully!");
  } catch (err) {
    console.log(err);
  }
}

