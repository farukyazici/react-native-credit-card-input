import PropTypes from 'prop-types';
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ViewPropTypes
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    color: "black",
    flex: 1
  },
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    keyboardType: "numeric",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => { },
    onChange: () => { },
    onBecomeEmpty: () => { },
    onBecomeValid: () => { },
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
      inputStyle, labelStyle,
      validColor, invalidColor, placeholderColor, inputComponent } = this.props;
    const TextInputComponent = inputComponent || TextInput;
    return (
      <View style={{flexDirection: 'column', width: '100%'}}>
        {!!label && <Text style={[labelStyle, {textAlign: "left", width: "100%"}]}>{label}</Text>}
        <TextInputComponent ref="input"
          keyboardType={keyboardType}
          autoCapitalise="words"
          autoCorrect={false}
          style={[
            s.baseInputStyle,
            inputStyle,
            ((validColor && status === "valid") ? { color: validColor } :
              (invalidColor && status === "invalid") ? { color: invalidColor } :
                {}),
          ]}
          underlineColorAndroid={"transparent"}
          placeholderColor={placeholderColor}
          placeholder={placeholder}
          value={value}
          onFocus={this._onFocus}
          onChangeText={this._onChange} />
      </View>
    );
  }
}
