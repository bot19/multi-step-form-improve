/**
 * Utility function to conditionally join class names together
 * Filters out falsy values and joins the remaining classes with spaces
 * TODO: write test for this
 *
 * @example
 * // Basic usage
 * classNames('base-class', 'another-class')
 *
 * @example
 * // Conditional classes
 * classNames('base-class', isActive && 'active-class')
 *
 * @example
 * // Multiple conditions
 * classNames(
 *   'base-class',
 *   isActive && 'active-class',
 *   isDisabled && 'disabled-class',
 *   variant === 'primary' && 'primary-class'
 * )
 *
 * @example
 * // Object-based conditional classes
 * classNames('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled,
 *   'primary-class': variant === 'primary'
 * })
 */
export const classNames = (
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string => {
  return classes
    .map(cls => {
      if (typeof cls === 'object' && cls !== null) {
        // Handle object syntax: { 'class-name': boolean }
        // turns 'active-class': true into ['active-class', true] for filter/map
        return (
          Object.entries(cls)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, condition]) => condition)
            .map(([className]) => className)
            .join(' ')
        );
      }
      return cls;
    })
    .filter(Boolean)
    .join(' ');
};
