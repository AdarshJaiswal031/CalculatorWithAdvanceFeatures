import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function CalPad() {
    const [displayValue, setDisplayValue] = useState('0');

    const handleButtonPress = (value) => {
        if (value === 'AC') {
            setDisplayValue('');
        }
        else if (value === 'C') {
            setDisplayValue(displayValue.slice(0, -1)); // Remove the last character
        }
        else if (value === '=') {
            try {
                const result = eval(displayValue); // Using eval for simplicity, consider a safer parsing method in production
                setDisplayValue(result.toString());
            } catch (error) {
                setDisplayValue('Error');
            }
        }
        else {
            setDisplayValue(displayValue + value);
        }
    };
    const renderButton = (value) => {
        if (specialButtons.includes(value)) {
            return (<TouchableOpacity
                key={value}
                style={styles.button}
                onPress={() => handleButtonPress(value)}
            >
                <Text style={styles.buttonOrange}>{value}</Text>
            </TouchableOpacity>)
        }
        else {
            return (<TouchableOpacity
                key={value}
                style={styles.button}
                onPress={() => handleButtonPress(value)}
            >
                <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>)
        }

    }

    const numberButtons = [
        ['AC', 'C', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['**', '0', '.', '='],
    ];
    const specialButtons = ['AC', 'C', '%', '/', '*', '-', '+', '=', '**'];
    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{displayValue}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    {numberButtons[0].map(renderButton)}
                </View>
                <View style={styles.row}>
                    {numberButtons[1].map(renderButton)}
                </View>
                <View style={styles.row}>
                    {numberButtons[2].map(renderButton)}
                </View>
                <View style={styles.row}>
                    {numberButtons[3].map(renderButton)}
                </View>
                <View style={styles.row}>
                    {numberButtons[4].map(renderButton)}
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        position: "relative",
        top: "22%",
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
        marginHorizontal: 20,
    },
    displayText: {
        fontSize: 40,
    },
    buttonContainer: {
        flex: 2.2,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 27,
    },
    buttonOrange: {
        fontSize: 27,
        color: "orange",

    },
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
        marginHorizontal: 30,

    },
});