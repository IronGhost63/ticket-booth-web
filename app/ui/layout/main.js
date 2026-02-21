import MainMenu from "@/app/ui/mainMenu";

export default function Layout({children, className}) {
  return (
    <div className={`main-layout ${className || ""}`}>
      <MainMenu />
      {children}
    </div>
  );
}
