import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Picker, Button, Image } from "react-native";

export default function App() {
	const [selectedMoney, setSelectedMoney] = useState("");
	const [value, setValue] = useState();
	const [convertedValue, setConvertedValue] = useState("");
	const [rates, setRates] = useState([]);

	const MoneyList = Object.keys(rates);

	useEffect(() => {
		getRates();
	}, []);

	const getRates = async () => {
		const url = 'http://data.fixer.io/api/latest?access_key=5cb4ee9f9f60281573154c30bd8c887f';
		try {
			const response = await fetch(url);
			const data = await response.json();
			setRates(data.rates);
		} catch (e) {
			Alert.alert("Error fetching data, ", error);
		}
	};

	const getConversion = () => {
		const conVal = (value / rates[selectedMoney]).toFixed(2);
		setConvertedValue(conVal);
	};

	return (
		<View style={styles.container}>
      <Image
				source={{ uri: 'https://www.thenewfederalist.eu/local/cache-gd2/6f/7bbd4d2a8a4b8a6be088e9d19c8de5.jpg?1604914817'}}
				style={styles.image}
			/>
			<Text style={styles.text}>{convertedValue} €</Text>
			<View style={styles.components}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setValue(value)}
          keyboardType='numeric'
				/>
				<Picker
					style={styles.picker}
					selectedValue={selectedMoney}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedMoney(itemValue)
					}
				>
				{MoneyList.map((c) => {
					return <Picker.Item key={c} label={c} value={c} />;
				})}
				</Picker>
			</View>
			<Button title="Convert to euro" onPress={getConversion} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
  text: {
    fontSize: 25 
  },
	components: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		margin: 10,
		width: "80%",
	},
	input: {
		width: "40%",
    borderColor: 'black',
		borderWidth: 1,
		borderColor: "#eee",
	},
	picker: {
		width: "40%",
    borderColor: 'black',
    borderWidth: 10,
	},
  image: {
		width: 300,
		height: 200,
		borderRadius: 20,
		marginBottom: 20,
	},
});