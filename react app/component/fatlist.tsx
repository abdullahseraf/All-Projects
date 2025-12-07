import { View, Text, StyleSheet, FlatList } from "react-native";

const menuItemsToDisplay = [
  { name: "abdullah", id: "1A" },
  { name: "himas", id: "2B" },
  { name: "lulu", id: "3C" },
  { name: "mohamed", id: "4D" },
  { name: "ihlas", id: "5E" },
  { name: "ahmed", id: "6F" },
  { name: "sara", id: "7G" },
  { name: "esil", id: "8H" },
];

const Item = ({ name }: { name: string }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
  </View>
);

const MenuItems = () => {
  const renderItem = ({ item }: { item: { name: string; id: string } }) => (
    <Item name={item.name} />
  );

  return (
    <View style={menuStyles.container}>
      <Text style={menuStyles.headerText}>fatlist</Text>
      <FlatList
        data={menuItemsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 0.75,
    backgroundColor: "#96faff5d",
    borderRadius: 10,
    padding: 20,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#00fbff3e",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "700",
    flexWrap: "wrap",
    textAlign: "center",
  },
  itemText: {
    color: "#ffffffff",
    fontSize: 30,
  },
});

export default MenuItems;
