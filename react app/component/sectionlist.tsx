import React from "react";

import { View, Text, StyleSheet, SectionList } from "react-native";

const menuItemsToDisplay = [
  {
    title: "section list",
    data: ["mom", "dad", "himas", "hadala", "lulu", "ahmed"],
  },
  {
    title: "ahmed aile",
    data: ["ahmed", "yaya", "esil"],
  },
];

const Item = ({ name }: { name: string }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
  </View>
);

const Separator = () => <View style={menuStyles.separator} />;

const Footer = () => (
  <Text style={menuStyles.footerText}>
    All Rights Reserved by Little Lemon 2022
  </Text>
);

const MenuItemsSection = () => {
  const renderItem = ({ item }: { item: string }) => <Item name={item} />;

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => <Text style={menuStyles.sectionHeader}>{title} </Text>;

  return (
    <View style={menuStyles.container}>
      <SectionList
        keyExtractor={(item, index) => item + index}
        sections={menuItemsToDisplay}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={Footer}
        ItemSeparatorComponent={Separator}
      ></SectionList>
    </View>
  );
};

// Add styles to the component
const menuStyles = StyleSheet.create({
  container: {
    flex: 0.75,
    backgroundColor: "#ffdbdb7f",
    borderRadius: 10,
    padding: 20,
  },

  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#ff00261d",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  sectionHeader: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "700",
    flexWrap: "wrap",
    textAlign: "center",
  },
  itemText: {
    color: "#b7ceffff",
    fontSize: 30,
  },
  separator: {
    borderBottomWidth: 1,

    borderColor: "#EDEFEE",
  },
  footerText: {
    color: "#EDEFEE",
    fontSize: 20,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

export default MenuItemsSection;
