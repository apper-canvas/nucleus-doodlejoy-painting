import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import ApperIcon from '../ApperIcon';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <ApperIcon 
        name="Sun" 
        size={16} 
        className="absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" 
      />
      <ApperIcon 
        name="Moon" 
        size={16} 
        className="absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;