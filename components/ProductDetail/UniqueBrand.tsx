import { TouchableOpacity, Text, FlatList } from "react-native";
import { useProductState } from "../recoilState/productState";

const UniqueBrand = (props: { setSelectedBrand: any; selectedBrand: any }) => {
  const { uniqueBrandsForSearch } = useProductState();

  return (
    <FlatList
      data={uniqueBrandsForSearch}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{
              borderRadius: 14,
              borderWidth: 2,
              borderColor:
                props.selectedBrand === item ? "darkred" : "lightgrey",
              marginTop: 20,
              padding: 10,
              marginBottom: 20,
            }}
            onPress={() => props.setSelectedBrand(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap: 12 }}
    />
  );
};

export default UniqueBrand;
