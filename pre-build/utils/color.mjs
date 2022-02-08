import Color from "color";

export const isHexColor = (code) => {
  // Valid -> #fff, #fafafa, #ebebeb09
  return typeof code === "string" && code.startsWith("#") && code.length <= 9;
};

export const isColor = (str) => {
  try {
    Color(str);
    return true;
  } catch (error) {
    console.log("Could not parse " + str);
  }
  return false;
};

export const parseColor = (str) => {
  return {
    r: Color(str).red() / 255,
    g: Color(str).green() / 255,
    b: Color(str).blue() / 255,
    a: Color(str).alpha(),
  };
};
