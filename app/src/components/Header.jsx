const Header = ({ title, onBack }) => (
    <div class="flex items-center justify-between p-4 border-b">
      {onBack && (
        <button onClick={onBack} class="text-sm text-blue-500">
          ← Назад
        </button>
      )}
      <h1 className="text-lg font-bold text-center w-full -ml-8">{title}</h1>
    </div>
  );
  
  export default Header;