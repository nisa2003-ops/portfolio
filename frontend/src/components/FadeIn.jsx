import { useInView } from "./useInView";

export default function FadeIn({ children, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in${visible ? " visible" : ""}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
