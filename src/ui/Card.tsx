import type { ReactNode } from 'react';
import { AnimatedContent } from './AnimatedContent';
import { Heading } from './Heading';

interface CardProps {
  children: ReactNode;
  stepKey: string;
  title: string;
  className?: string;
}

export const Card = ({
  children,
  stepKey,
  title,
  className = '',
}: CardProps) => {
  return (
    <div className="mt-10 min-w-[320px] xs:mx-auto xs:w-full xs:max-w-[480px]">
      <AnimatedContent
        stepKey={stepKey}
        className={`bg-white px-6 py-12 shadow-sm xs:rounded-lg xs:px-12 ${className}`}
      >
        <Heading text={title} classes="mb-4" />
        {children}
      </AnimatedContent>
    </div>
  );
};
