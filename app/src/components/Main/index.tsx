import React, { useState } from "react";
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from "./styles";
import { Header } from "../Header";
import { Categories } from "../Categories";
import { Menu } from "../Menu";
import { Button } from "../Button";
import { TableModal } from "../TableModal";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");

  function handleSaveTable(table: string) {
    alert(`Novo pedido para a mesa ${table}`);
    setIsTableModalVisible(false);
    setSelectedTable(table);
  }

  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
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
