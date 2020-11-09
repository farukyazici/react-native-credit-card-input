import React from "react";
import { Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import valid from "card-validator";
import Icons from "./Icons";

const s = StyleSheet.create({
  icon: {
    width: 60,
    height: 40,
  },
});

const CardIcon = ({number}) => {
  const type = number?.length ? valid.number(number)?.card?.type : '';
  return (
    <Image style={[s.icon]}
      source={{ uri: Icons[type] }} />
  );
}

CardIcon.propTypes = {
  number: PropTypes.string,
};

export default CardIcon;
