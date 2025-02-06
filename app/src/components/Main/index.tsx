import React, { useEffect, useState } from "react";
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from "./styles";
import { Header } from "../Header";
import { Categories } from "../Categories";
import { Menu } from "../Menu";
import { Button } from "../Button";
import { TableModal } from "../TableModal";
import { Cart } from "../Cart";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { ActivityIndicator } from "react-native";
import { Empty } from "../Icons/Empty";
import { Text } from "../Text";
import { Category } from "../../types/Category";
import api from "../../utils/api";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([cateriesResponse, productsResponse]) => {
        setCategories(cateriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(`route`);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    alert(`Novo pedido para a mesa ${table}`);
    setIsTableModalVisible(false);
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItem([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItem((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];

      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItem((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          onCancelOrder={handleResetOrder}
          selectedTable={selectedTable}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                onSelectCategory={handleSelectCategory}
                categories={categories}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products && products.length > 0 ? (
                  <MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={!isLoading}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              onAdd={handleAddToCart}
              cartItems={cartItem}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        onClose={() => setIsTableModalVisible(false)}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
