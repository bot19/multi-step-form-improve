import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';
import { cn } from '../utils';

interface FeedbackProps {
  title: string;
  content: string[];
  type: 'error' | 'warning' | 'success' | 'info';
}

const IconMap = {
  error: <XCircleIcon className="size-5 text-red-400" />,
  warning: <ExclamationTriangleIcon className="size-5 text-yellow-400" />,
  success: <CheckCircleIcon className="size-5 text-green-400" />,
  info: <InformationCircleIcon className="size-5 text-blue-400" />,
};

export const Feedback = ({ title, content, type }: FeedbackProps) => {
  return (
    <div
      className={cn(
        'rounded-md p-4',
        type === 'error' && 'bg-red-50',
        type === 'warning' && 'bg-yellow-50',
        type === 'success' && 'bg-green-50',
        type === 'info' && 'bg-blue-50'
      )}
    >
      <div className="flex">
        <div className="shrink-0">{IconMap[type]}</div>
        <div className="ml-3">
          <h3
            className={cn(
              'text-sm font-medium',
              type === 'error' && 'text-red-800',
              type === 'warning' && 'text-yellow-800',
              type === 'success' && 'text-green-800',
              type === 'info' && 'text-blue-800'
            )}
          >
            {title}
          </h3>
          <div
            className={cn(
              'mt-2 text-sm',
              type === 'error' && 'text-red-700',
              type === 'warning' && 'text-yellow-700',
              type === 'success' && 'text-green-700',
              type === 'info' && 'text-blue-700'
            )}
          >
            <ul className="list-disc">
              {content.length === 1 ? (
                <p>{content[0]}</p>
              ) : (
                content.map(item => <li key={item}>{item}</li>)
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
