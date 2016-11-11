import React from 'react';
import 'css/components/SVG';

export default function SVG({ name, className }) {
  return (
    <svg className={`svg ${className || ''}`}>
      <use xlinkHref={`#${name}`}/>
    </svg>
  );
}
