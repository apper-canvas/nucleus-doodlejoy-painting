import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ApperIcon from '../components/ApperIcon';
import ThemeToggle from '../components/layout/ThemeToggle';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartPainting = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/canvas');
    }, 800);
  };

  const floatingIcons = [
    { icon: 'Paintbrush', color: 'text-red-500', delay: 0 },
    { icon: 'Palette', color: 'text-blue-500', delay: 0.2 },
    { icon: 'Brush', color: 'text-green-500', delay: 0.4 },
    { icon: 'Pen', color: 'text-yellow-500', delay: 0.6 },
    { icon: 'Edit', color: 'text-purple-500', delay: 0.8 },
    { icon: 'Zap', color: 'text-orange-500', delay: 1.0 }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 paint-splash-bg opacity-10" />
      
      {/* Floating Icons */}
      <AnimatePresence>
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-20`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0 
            }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <ApperIcon name={item.icon} size={32} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-2xl mx-auto"
      >
        <Card className="backdrop-blur-sm bg-card/80 border-2 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Logo/Title */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-4 shadow-lg">
                <ApperIcon name="Paintbrush" size={36} className="text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold rainbow-text mb-2">
                DoodleJoy
              </h1>
              <p className="text-lg text-muted-foreground">
                Digital Painting Made Simple
              </p>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Feeling bored? Start painting! 🎨
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Express your creativity on a digital canvas with intuitive tools. 
                Choose colors, adjust brush sizes, and create beautiful artwork 
                that you can save and share.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <ApperIcon name="Palette" className="text-primary mb-2" size={24} />
                <span className="text-sm font-medium">Color Picker</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <ApperIcon name="Settings" className="text-primary mb-2" size={24} />
                <span className="text-sm font-medium">Brush Tools</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                <ApperIcon name="Download" className="text-primary mb-2" size={24} />
                <span className="text-sm font-medium">Save Artwork</span>
              </div>
            </motion.div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <Button
                onClick={handleStartPainting}
                className="artistic-button text-lg px-8 py-4 group"
                disabled={isAnimating}
              >
                <motion.div
                  className="flex items-center gap-3"
                  animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ApperIcon 
                    name="Paintbrush" 
                    size={20} 
                    className="group-hover:animate-brush-stroke" 
                  />
                  {isAnimating ? 'Opening Canvas...' : 'Start Painting'}
                  {!isAnimating && <ApperIcon name="ArrowRight" size={16} />}
                </motion.div>
              </Button>
            </motion.div>

            {/* Quick Start Tip */}
            <motion.p
              className="text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              💡 Tip: Use your mouse or touch to draw on the canvas
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomePage;