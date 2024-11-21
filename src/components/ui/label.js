
const React = require("react");
const LabelPrimitive = require("@radix-ui/react-label");
const { cva } = require("class-variance-authority");

const { cn } = require("../../lib/utils");

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...rest}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
