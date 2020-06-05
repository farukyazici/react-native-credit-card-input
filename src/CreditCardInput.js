import PropTypes from 'prop-types';
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewPropTypes,
} from "react-native";

import CreditCard from "./CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 16,
  },
  form: {
    width: '100%',
  },
  inputsContainer: {
    marginTop: 16,
    width: '100%',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: { flexDirection: 'row', marginTop: 12 },
  flex: { flex: 1 },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: ViewPropTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
  };

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid, inputComponent
    } = this.props;

    return {
      inputStyle,
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,
      inputComponent: inputComponent,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    };
  };

  render() {
    const {
      cardImageFront, cardImageBack,
      values: { number, expiry, cvc, name, type }, focused,
      requiresName, requiresCVC, requiresPostalCode,
      cardScale, cardFontFamily
    } = this.props;

    return (
      <ScrollView ref="Form"
        horizontal={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={s.container}
        style={s.form}>
        <CreditCard focused={focused}
          brand={type}
          scale={cardScale}
          fontFamily={cardFontFamily}
          imageFront={cardImageFront}
          imageBack={cardImageBack}
          name={requiresName ? name : " "}
          number={number}
          expiry={expiry}
          cvc={cvc} />
        <View style={s.inputsContainer}>
          {requiresName &&
            <CCInput {...this._inputProps("name")}
              keyboardType="default" />}
          <CCInput {...this._inputProps("number")} containerStyle={{marginTop: 12}} />
        </View>
        <View style={s.row}>
          <View style={s.flex}>
            <CCInput {...this._inputProps("expiry")} />
          </View>
          {requiresCVC &&
            <View style={s.flex}>
              <CCInput {...this._inputProps("cvc")} />
            </View>}
        </View>
        {requiresPostalCode &&
          <CCInput {...this._inputProps("postalCode")} />}
      </ScrollView>
    );
  }
}

CreditCardInput.defaultProps = {
  labels: {
    name: "Cardholder's name",
    number: "Card Number",
    expiry: "Expiry",
    cvc: "CVC",
    postalCode: "Postal Code",
  },
  placeholders: {
    name: "Full Name",
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
    postalCode: "34567",
  },
  inputContainerStyle: {
  },
  validColor: "",
  invalidColor: "red",
  placeholderColor: "gray",
};
