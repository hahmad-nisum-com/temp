interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode, props: Record<string, unknown>) => JSX.Element;
  wrapperProps?: Record<string, unknown>;
  children: React.ReactNode;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  wrapperProps = {},
  children,
}: ConditionalWrapperProps): React.ReactNode => {
  if (condition) {
    return wrapper(children, wrapperProps);
  }
  return children;
};
