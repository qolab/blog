import React from 'react';
import 'src/assets/css/typography.css'

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property vallue called `fill`. `fill` is useful
 * when you want to change your logo depending on the theme you are on.
 */
export default function Logo({ fill }) {
  return (
 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="150px" height="34px" viewBox="0 0 150 34" >
    <text x="0" y="25" fill={fill} style={{fontSize: "25px", fontFamily: "Qolab Font"}}>qolab</text>
</svg>
  );
}
