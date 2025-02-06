import { useState } from "react";
import { categories } from "../../mocks/categories";
import { Text } from "../Text";
import { CategoryContainer, Icon } from "./styles";
import { FlatList } from "react-native";
import { Category } from "../../types/Category";

interface CategoriesProps {
  categories: Category[] | undefined;
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  function handleCategorySelect(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;

    onSelectCategory(category)
    setSelectedCategory(category);
  }

  return (
    <FlatList
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer onPress={() => handleCategorySelect(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text opacity={isSelected ? 1 : 0.5} weight="600" size={14}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
