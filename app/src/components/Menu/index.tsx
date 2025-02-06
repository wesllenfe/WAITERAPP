import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Text } from "../Text";
import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import React, { useState } from "react";
import { ProductModal } from "../ProductModal";
import { Product } from "../../types/Product";

interface MenuProps {
  onAddToCart: ( product: Product ) => void;
  products: Product[] | undefined;
}

export function Menu( { onAddToCart, products }: MenuProps ) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
       />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.3.43:3001/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 4 }}>
                {product.description}
              </Text>
              <Text weight="600" size={14}>
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>     
        )}
      />
    </>
  );
}
