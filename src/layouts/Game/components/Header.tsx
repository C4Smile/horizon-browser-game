// components
import Resources from "./Resources/Resources";

/**
 * Game header
 * @returns Header component
 */
function Header() {
  return (
    <header className="flex p-3 w-full justify-between">
      <div></div>
      <Resources />
    </header>
  );
}

export default Header;
