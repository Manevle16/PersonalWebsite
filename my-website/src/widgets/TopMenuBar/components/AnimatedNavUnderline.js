import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

function AnimatedNavUnderline({ width, position }) {
  const style = useSpring({
    to: {
      width,
      left: position
    }
  });
  return <animated.div className='nav-underline' style={style}></animated.div>;
}

AnimatedNavUnderline.propTypes = {
  width: PropTypes.number,
  position: PropTypes.number
};
export default AnimatedNavUnderline;
