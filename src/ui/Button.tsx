import { cn } from '../utils';

interface ButtonProps {
  colour: 'primary' | 'light';
  disabled?: boolean;
  text: string;
  type: 'submit' | 'button';
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={cn(
        'flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer',
        props.colour === 'primary' && 'bg-primary text-white hover:bg-primary',
        props.colour === 'light' &&
          'bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50',
        props.disabled && 'disabled:cursor-not-allowed disabled:opacity-50'
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
