export default function Layout ({children, className}) {
  return (
    <div className={`blank-layout ${className || ""}`}>
      {children}
    </div>
  )
};
