import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  promotionsSection: {
    backgroundColor: "white",
  },

  sectionHeading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 70,
  },
  promotionCard: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 8,
    padding: 10,
  },
  promotionImage: {
    maxWidth: 250,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  promotionDetails: {
    marginLeft: 20,
    flex: 1,
  },
  promotionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  promotionDescription: {
    fontSize: 14,
    color: "orangered",
    marginBottom: 20,
  },
  promotionButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
    width: 190,
  },
  buttonText: {
    color: "#fff",
  },
});
