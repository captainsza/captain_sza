import React from 'react'
import { motion } from 'framer-motion'
import { Code, Cpu, CircuitBoard } from 'lucide-react'

// Enhanced Statistics Panel with cyberpunk aesthetic
const StatisticsPanel: React.FC = () => {
  // Statistics data
  const stats = [
    { 
      label: 'Projects', 
      value: 45, 
      color: 'blue', 
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Delivered' 
    },
    { 
      label: 'Experience', 
      value: 1, 
      unit: 'years', 
      color: 'purple', 
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Professional' 
    },
    { 
      label: 'Technologies', 
      value: 10, 
      color: 'pink', 
      icon: <CircuitBoard className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Mastered'
    },
  ];

  // Responsive positioning classes
  const positionClasses = "absolute bottom-4 right-2 sm:bottom-6 sm:right-4 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10";

  return (
    <div className={`${positionClasses} flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 lg:gap-4 z-20`}>
      {stats.map(({ label, value, unit, color, icon, description }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 30 + (index * 10), scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1 + (index * 0.15), 
            duration: 0.6, 
            type: "spring", 
            stiffness: 100 
          }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black/60 to-gray-900/50 p-2 sm:p-3 md:p-4 backdrop-blur-md border border-gray-700/30"
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 0 25px rgba(59, 130, 246, 0.3)` 
          }}
        >
          {/* Tech corner decorations with animated highlights */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, idx) => (
            <motion.div 
              key={corner}
              className={`absolute ${corner.includes('top') ? 'top-0' : 'bottom-0'} ${corner.includes('left') ? 'left-0' : 'right-0'} w-2 h-2 border-${corner.includes('top') ? 't' : 'b'} border-${corner.includes('left') ? 'l' : 'r'} border-blue-500/40`}
              animate={{ 
                borderColor: ["rgba(59, 130, 246, 0.4)", "rgba(139, 92, 246, 0.4)", "rgba(236, 72, 153, 0.4)", "rgba(59, 130, 246, 0.4)"]
              }}
              transition={{ duration: 3, delay: idx * 0.5, repeat: Infinity }}
            />
          ))}
          
          {/* Enhanced shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              repeatDelay: index * 0.5 + 1,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className={`text-${color}-400`}>{icon}</div>
                <motion.span
                  className="block text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    textShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 5px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
                  }}
                  transition={{ 
                    opacity: { duration: 2 },
                    textShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  {value}
                  {unit && <span className="ml-1 text-xs sm:text-sm">{unit}</span>}
                </motion.span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <motion.div 
                  className={`h-1 w-1 rounded-full bg-${color}-500/50`}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs sm:text-sm text-gray-300 font-mono tracking-tight">{label}</span>
              </div>
              <span className="text-xs text-gray-400 mt-0.5 hidden sm:block">{description}</span>
            </div>
          </div>
          
          {/* Enhanced scan line with glow */}
          <motion.div 
            className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            animate={{
              y: ['0%', '400%'],
              boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 3px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, repeatType: "mirror" },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "mirror" },
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default StatisticsPanel;
