import React from 'react';
import burger from './burger'; // Adjust the import paths as necessary
import ArrowLeft from './arrowLeft'; // Adjust the import paths as necessary
import grape from './grape';
import vegetable from './vegetable';
import milk from './milk';
import burButton from './burButton'; 

// Define the icons object outside the component
const icons = {
  burger: burger,
  arrowLeft: ArrowLeft,
  grape : grape,
  vegetable: vegetable,
  milk : milk,
  burButton  : burButton,

};

// The Icon component that renders based on the name prop
const Icon = ({ name, size = 24, strokeWidth = 1.9, ...props }) => {
  const IconComponent = icons[name];

  // Ensure the icon name exists in the icons object
  if (!IconComponent) {
    return null; // Return nothing if the icon name is invalid
  }

  return (
    <IconComponent
      height={size}
      width={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

export default Icon;
