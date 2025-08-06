import { cn } from '../utils';

interface HeadingProps {
  text: string;
  classes?: string;
}

export const Heading = (props: HeadingProps) => {
  return (
    <h2
      className={cn(
        'text-center text-2xl/9 font-bold tracking-tight text-secondary',
        props.classes
      )}
    >
      {props.text}
    </h2>
  );
};
