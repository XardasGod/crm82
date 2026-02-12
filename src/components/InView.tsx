import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface InViewProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  animation?: string;
  children: React.ReactNode;
}

export const InView = ({
  animation = "anim-hidden",
  className,
  children,
  ...props
}: InViewProps) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(animation, inView && "anim-visible", className)}
      {...props}
    >
      {children}
    </div>
  );
};
