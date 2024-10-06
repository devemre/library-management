import React from 'react';

type ButtonProps = {
  name: string;
  type?: string;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className='rounded-md flex-1 flex justify-center p-1 bg-slate-700 text-white active:bg-slate-600 transition-all'
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
