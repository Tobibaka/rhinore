'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define interfaces for type safety
interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  x: number;
  y: number;
  delay: number;
}

interface FallingRock {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  delay: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// Move this OUTSIDE the component, before the export
const messages = [
  "rhinore detects you are 100% safe today.....with us",
  "Innovation at your service",
  "Secure by design",
  "Building tomorrow's technology",
  "Where AI meets creativity"
];

export default function HomePage() {
  // Initialize with safe default values
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [robotPos, setRobotPos] = useState<MousePosition>({ x: 0, y: 500 });
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [hue, setHue] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [sphereRotation, setSphereRotation] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [fallingRocks, setFallingRocks] = useState<FallingRock[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize client-side values after mount
  useEffect(() => {
    setMounted(true);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    setMousePos({ x: centerX, y: centerY });
    setRobotPos({ x: centerX, y: 500 });
  }, []);

  // Generate stars on mount
  useEffect(() => {
    if (!mounted) return;

    const newStars: Star[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
    
    const newShootingStars: ShootingStar[] = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: i * 8 + Math.random() * 3
    }));
    setShootingStars(newShootingStars);
    
    // Initialize falling rocks
    const rocks: FallingRock[] = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: -10,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
      speed: 2 + Math.random() * 2,
      delay: i * 4 + Math.random() * 3
    }));
    setFallingRocks(rocks);
  }, [mounted]);

  // Track mouse position and reset when cursor leaves
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mounted]);

  // Smooth robot following with sphere rotation
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setRobotPos(prev => {
        const dx = mousePos.x - prev.x;
        const distance = Math.abs(dx);
        
        if (distance > 5) {
          setIsMoving(true);
          const speed = Math.min(distance * 0.08, 3);
          const direction = dx > 0 ? 1 : -1;
          setRotationSpeed(speed * direction);
        } else {
          setIsMoving(false);
          setRotationSpeed(prev => {
            if (Math.abs(prev) < 0.02) return 0;
            return prev * 0.97;
          });
        }
        
        return {
          x: prev.x + dx * 0.03,
          y: prev.y
        };
      });
    }, 16);
    return () => clearInterval(interval);
  }, [mousePos, mounted]);

  // Apply rotation to sphere
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setSphereRotation(prev => prev + rotationSpeed);
    }, 16);
    return () => clearInterval(interval);
  }, [rotationSpeed, mounted]);

  // Cycle head colors - faster
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setHue(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  // Message rotation - now messages won't change on every render
  useEffect(() => {
    if (!mounted) return;

    const showNewMessage = () => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMsg);
      setShowMessage(true);
      
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    };

    showNewMessage();
    const interval = setInterval(showNewMessage, 5000);
    return () => clearInterval(interval);
  }, [mounted]); // Remove 'messages' from dependency array since it's now constant

  // Random blinking effect
  useEffect(() => {
    if (!mounted) return;

    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    }, 2000);
    return () => clearInterval(blinkInterval);
  }, [mounted]);

  // Blink when moving
  useEffect(() => {
    if (isMoving && Math.random() > 0.8) {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }
  }, [isMoving]);

  // Calculate eye positions with 3D effect
  const calculateEyePosition = (eyeX: number, eyeY: number) => {
    const dx = mousePos.x - robotPos.x;
    const dy = mousePos.y - robotPos.y;
    const angle = Math.atan2(dy, dx);
    const distanceFromRobot = Math.sqrt(dx * dx + dy * dy);
    const maxMovement = 10;
    const movement = Math.min(maxMovement, distanceFromRobot / 30);
    return {
      x: eyeX + Math.cos(angle) * movement,
      y: eyeY + Math.sin(angle) * movement
    };
  };

  const leftEye = calculateEyePosition(-1, 0);
  const rightEye = calculateEyePosition(1, 0);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '2px',
            height: '2px',
            animation: `shoot 3s linear ${star.delay}s infinite`
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg shadow-white"></div>
        </div>
      ))}

      {/* Logo - Only Rhinore text is hoverable */}
      <div 
        className="absolute top-1/3 left-1/2 z-40"
        style={{
          transform: 'translate(-50%, -50%)',
          perspective: '1000px'
        }}
      >
        <div 
          className="relative px-4 inline-block text-center cursor-pointer"
          onMouseEnter={() => {
            setIsLogoHovered(true);
            setIsBlinking(true);
          }}
          onMouseLeave={() => {
            setIsLogoHovered(false);
            setIsBlinking(false);
          }}
        >
          <h1 
            className="text-6xl font-bold tracking-tighter relative" 
            style={{ 
              fontFamily: 'Arial, sans-serif', 
              fontWeight: '700', 
              letterSpacing: '-0.05em',
              transform: isLogoHovered ? 'translateZ(50px) scale(1.1)' : 'translateZ(0) scale(1)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease-in-out'
            }}
          >
            <span 
              className="relative"
              style={{ 
                color: isLogoHovered ? `hsl(${hue}, 80%, 65%)` : 'white',
                transition: 'color 0.1s linear'
              }}
            >
              <span className="relative z-10">R</span>
              <span className="relative inline-block">
                <span 
                  className="absolute bg-gray-600"
                  style={{ 
                    width: '140%', 
                    height: '160%', 
                    left: '-20%', 
                    top: '-30%',
                    transform: isLogoHovered ? 'translateZ(40px) scale(1.08)' : 'translateZ(0) scale(1)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s ease-in-out 0.3s'
                  }}
                >
                  {/* Shadow for 'h' */}
                  <div 
                    className="absolute text-6xl font-bold opacity-40"
                    style={{ 
                      fontFamily: 'Arial, sans-serif',
                      color: 'rgba(0,0,0,0.5)',
                      left: '18%',
                      top: '18%',
                      transform: 'translate(-5px, 5px)',
                      filter: 'blur(2px)'
                    }}
                  >
                    h
                  </div>
                  
                  {/* Shadow for 'i' */}
                  <div 
                    className="absolute text-6xl font-bold opacity-40"
                    style={{ 
                      fontFamily: 'Arial, sans-serif',
                      color: 'rgba(0,0,0,0.5)',
                      left: '45%',
                      top: '18%',
                      transform: 'translate(-3px, 3px)',
                      filter: 'blur(2px)'
                    }}
                  >
                    i
                  </div>
                  
                  {/* Shadow for 'n' */}
                  <div 
                    className="absolute text-6xl font-bold opacity-40"
                    style={{ 
                      fontFamily: 'Arial, sans-serif',
                      color: 'rgba(0,0,0,0.5)',
                      left: '58%',
                      top: '18%',
                      transform: 'translate(-5px, 5px)',
                      filter: 'blur(2px)'
                    }}
                  >
                    n
                  </div>
                </span>
                <span className="relative z-10 text-white">hin</span>
              </span>
              <span className="relative z-10">o</span>
            </span>
            <span className="text-white">re</span>
          </h1>
        </div>
        
        {/* Description Text - Separate div, no hover effect, behind robot */}
        <div className="mt-8 max-w-2xl mx-auto relative z-30">
          <p className="text-white text-lg leading-relaxed tracking-wide" style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.05em', fontWeight: '500' }}>
            Rhinore is a smart mine safety system using IoT and AI to predict hazards.
            <br />
            It tracks stress, vibration, and pressure in real time.
            <br />
            Built for overmen and control heads, it ensures safer, smarter mining.
          </p>
        </div>
      </div>

      {/* Robot Container - On top of everything */}
      <div className="absolute inset-0 z-50" style={{ pointerEvents: 'none' }}>
        <div
          className="absolute transition-all duration-100 ease-out"
          style={{
            left: `${robotPos.x}px`,
            top: `${robotPos.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            {/* Spaceship Base */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-52 h-10 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-2xl border-t-2 border-gray-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full"></div>
            </div>

            {/* Robot Body */}
            <div 
              className="relative w-48 h-48 rounded-full shadow-2xl overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset -10px -10px 30px rgba(0,0,0,0.15), inset 10px 10px 30px rgba(255,255,255,0.3)',
                border: '3px dotted rgba(255,255,255,0.3)',
                transform: `rotate(${sphereRotation}deg)`,
                transition: 'transform 0.05s linear'
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                {(() => {
                  const centerX = 100;
                  const centerY = 100;
                  const sphereRadius = 90;
                  const dots = [];
                  const gridSize = 12;
                  const spacing = (sphereRadius * 2) / gridSize;
                  
                  for (let row = 0; row <= gridSize; row++) {
                    for (let col = 0; col <= gridSize; col++) {
                      const gridX = col * spacing - sphereRadius;
                      const gridY = row * spacing - sphereRadius;
                      const distFromCenter = Math.sqrt(gridX * gridX + gridY * gridY);
                      
                      if (distFromCenter <= sphereRadius) {
                        const nx = gridX / sphereRadius;
                        const ny = gridY / sphereRadius;
                        const nDist = nx * nx + ny * ny;
                        const z = Math.sqrt(Math.max(0, 1 - nDist));
                        const minSize = 2;
                        const maxSize = 14;
                        const dotSize = minSize + (maxSize - minSize) * z;
                        const perspectiveFactor = 1 + z * 0.15;
                        const displayX = centerX + gridX * perspectiveFactor;
                        const displayY = centerY + gridY * perspectiveFactor;
                        
                        dots.push({ x: displayX, y: displayY, r: dotSize / 2, z: z });
                      }
                    }
                  }
                  
                  dots.sort((a, b) => a.z - b.z);
                  
                  return dots.map((dot, i) => (
                    <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="rgba(0,0,0,0.7)" />
                  ));
                })()}
              </svg>
              
              <div className="absolute rounded-full pointer-events-none" style={{ top: '8%', left: '12%', width: '40%', height: '40%', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.6), rgba(255,255,255,0.2) 40%, transparent 70%)', filter: 'blur(12px)' }}></div>
              <div className="absolute rounded-full pointer-events-none" style={{ bottom: '15%', right: '15%', width: '25%', height: '25%', background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 60%)', filter: 'blur(8px)' }}></div>
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.2) 80%, transparent 100%)' }}></div>
            </div>
            
            {/* Robot Head */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24">
              <div className="relative w-full h-full rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%)',
                  backdropFilter: 'blur(5px)',
                  boxShadow: 'inset 0 -8px 15px rgba(255,255,255,0.2), 0 8px 25px rgba(0,0,0,0.3)',
                  border: '1.5px solid rgba(255,255,255,0.4)'
                }}
              >
                <div 
                  className="absolute inset-1 rounded-full transition-colors duration-100"
                  style={{
                    background: isLogoHovered 
                      ? `linear-gradient(135deg, hsl(${hue}, 80%, 65%), hsl(${(hue + 60) % 360}, 80%, 65%), hsl(${(hue + 120) % 360}, 80%, 65%))`
                      : `linear-gradient(135deg, hsl(${hue}, 80%, 65%), hsl(${(hue + 60) % 360}, 80%, 65%), hsl(${(hue + 120) % 360}, 80%, 65%))`,
                    boxShadow: 'inset 0 -8px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Eyes */}
                  <div className="absolute rounded-full transition-all duration-100" style={{ left: `calc(50% - 12px + ${leftEye.x}px)`, top: `calc(50% - ${isBlinking ? 5 : 8}px + ${leftEye.y}px)`, width: '10px', height: isBlinking ? '10px' : '16px', backgroundColor: 'white', border: '2px solid rgba(0,0,0,0.3)' }} />
                  <div className="absolute rounded-full transition-all duration-100" style={{ left: `calc(50% + 2px + ${rightEye.x}px)`, top: `calc(50% - ${isBlinking ? 5 : 8}px + ${rightEye.y}px)`, width: '10px', height: isBlinking ? '10px' : '16px', backgroundColor: 'white', border: '2px solid rgba(0,0,0,0.3)' }} />
                  
                  {/* Smile */}
                  <div className="absolute transition-all duration-300" style={{ left: '50%', top: isLogoHovered ? '60%' : '65%', transform: 'translateX(-50%)', width: isLogoHovered ? '28px' : '20px', height: isLogoHovered ? '14px' : '8px', borderBottom: '2px solid rgba(0,0,0,0.6)', borderRadius: isLogoHovered ? '0 0 14px 14px' : '0 0 10px 10px', borderLeft: '2px solid rgba(0,0,0,0.6)', borderRight: '2px solid rgba(0,0,0,0.6)', borderTop: 'none' }} />
                </div>

                <div className="absolute top-2 left-3 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), transparent)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          {/* Speech Bubble */}
          {showMessage && (
            <div className="absolute left-full ml-8 top-0 whitespace-nowrap animate-fade-in">
              <div className="relative bg-white px-6 py-3 rounded-2xl shadow-xl">
                <p className="text-gray-800 font-medium">{currentMessage}</p>
                <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Mountain Range - More realistic with fewer mountains */}
      <div className="absolute bottom-0 left-0 w-full h-80 overflow-hidden pointer-events-none" style={{ zIndex: 45 }}>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          
          {/* Back mountains (distant, darker) */}
          <polygon 
            points="0,400 200,300 400,320 600,280 800,310 1000,290 1200,320 1200,400" 
            fill="#7a8a9a"
          />
          
          {/* Middle mountains (medium distance) */}
          <polygon 
            points="0,400 150,340 350,360 550,320 750,350 950,330 1150,360 1200,350 1200,400" 
            fill="#9aaaba"
          />
          
          {/* Front mountains (closest, lightest) */}
          <polygon 
            points="0,400 100,360 250,370 400,340 600,365 800,350 950,370 1100,355 1200,375 1200,400" 
            fill="#bacada"
          />
          
          {/* Main peak 1 - left side */}
          <polygon 
            points="150,400 200,380 250,340 300,370 350,400" 
            fill="#d0e0e8"
          />
          
          {/* Main peak 2 - center (tallest) */}
          <polygon 
            points="450,400 500,360 580,310 660,360 710,400" 
            fill="#e0e8f0"
          />
          
          {/* Main peak 3 - right side */}
          <polygon 
            points="900,400 950,370 1020,330 1070,365 1120,400" 
            fill="#d5e5ed"
          />
          
          {/* Highlights on sunlit faces */}
          <polygon 
            points="250,340 280,350 300,370 280,375 250,360" 
            fill="#f0f8ff"
            opacity="0.9"
          />
          <polygon 
            points="580,310 620,325 660,360 620,365 580,340" 
            fill="#ffffff"
            opacity="0.85"
          />
          <polygon 
            points="1020,330 1050,345 1070,365 1050,370 1020,350" 
            fill="#f5fbff"
            opacity="0.9"
          />
          
          {/* Shadow valleys */}
          <polygon 
            points="350,370 400,400 450,400 450,360 400,375" 
            fill="#6a7a8a"
          />
          <polygon 
            points="710,365 760,400 810,400 810,355 760,370" 
            fill="#5a6a7a"
          />
          
        </svg>
      </div>

      {/* Falling Rocks - Each completely different shape */}
      {fallingRocks.map((rock) => {
        // Completely different rock shapes - jagged, round, flat, chunky
        const rockShapes = [
          // Rock 0: Jagged, sharp edges
          "25,3 38,5 48,15 50,28 45,42 38,50 20,48 8,45 3,32 5,18 15,8",
          // Rock 1: Round, smooth boulder
          "25,5 35,7 42,15 46,25 48,35 45,45 35,50 25,52 15,50 8,42 5,30 6,18 12,10 18,6",
          // Rock 2: Flat, wide rock
          "15,15 40,12 48,20 50,30 45,38 35,42 15,40 5,35 3,25 8,18",
          // Rock 3: Chunky, irregular
          "20,8 32,5 45,10 50,22 48,35 42,45 30,50 18,48 8,42 5,28 8,15 15,10"
        ];
        
        const highlightShapes = [
          "25,3 32,8 35,15 28,12", // Jagged highlight
          "25,5 32,8 35,18 28,15", // Round highlight
          "15,15 25,13 35,18 25,20", // Flat highlight
          "20,8 28,10 30,20 22,18" // Chunky highlight
        ];
        
        // Different textures and colors
        const rockColors = [
          { light: '#b0b0b0', mid: '#707070', dark: '#404040' }, // Light gray
          { light: '#959595', mid: '#5a5a5a', dark: '#2a2a2a' }, // Dark gray
          { light: '#a8a8a8', mid: '#686868', dark: '#383838' }, // Medium gray
          { light: '#8f8f8f', mid: '#4f4f4f', dark: '#1f1f1f' }  // Very dark
        ];
        
        const color = rockColors[rock.id];
        
        return (
          <div
            key={rock.id}
            className="absolute pointer-events-none"
            style={{
              left: `${rock.x}%`,
              bottom: '20%',
              width: `${rock.size}px`,
              height: `${rock.size}px`,
              animation: `fallRock ${10 + rock.id * 3}s linear ${rock.delay}s infinite`,
              zIndex: 46
            }}
          >
            <svg viewBox="0 0 55 55" style={{ transform: `rotate(${rock.rotation}deg)` }}>
              <defs>
                <linearGradient id={`rockGrad${rock.id}`} x1="20%" y1="20%" x2="80%" y2="80%">
                  <stop offset="0%" stopColor={color.light} />
                  <stop offset="50%" stopColor={color.mid} />
                  <stop offset="100%" stopColor={color.dark} />
                </linearGradient>
                <radialGradient id={`rockRadial${rock.id}`}>
                  <stop offset="0%" stopColor={color.light} />
                  <stop offset="70%" stopColor={color.mid} />
                  <stop offset="100%" stopColor={color.dark} />
                </radialGradient>
              </defs>
              
              {/* Main rock body with unique gradient */}
              <polygon 
                points={rockShapes[rock.id]}
                fill={rock.id % 2 === 0 ? `url(#rockGrad${rock.id})` : `url(#rockRadial${rock.id})`}
                stroke="#1a1a1a"
                strokeWidth="1.5"
              />
              
              {/* Highlight */}
              <polygon 
                points={highlightShapes[rock.id]}
                fill="#d5d5d5"
                opacity={0.4 + rock.id * 0.1}
              />
              
              {/* Multiple crack lines for texture */}
              <line 
                x1={12 + rock.id * 4} 
                y1={18 + rock.id * 5} 
                x2={22 + rock.id * 3} 
                y2={32 + rock.id * 4} 
                stroke="#0a0a0a" 
                strokeWidth="1.2" 
                opacity="0.7"
              />
              <line 
                x1={28 + rock.id * 2} 
                y1={15 + rock.id * 3} 
                x2={35 + rock.id * 2} 
                y2={28 + rock.id * 2} 
                stroke="#0a0a0a" 
                strokeWidth="0.8" 
                opacity="0.5"
              />
              
              {/* Small detail spots/texture */}
              <circle cx={18 + rock.id * 5} cy={25 + rock.id * 3} r="1.5" fill="#1a1a1a" opacity="0.6" />
              <circle cx={32 + rock.id * 3} cy={30 + rock.id * 2} r="1" fill="#1a1a1a" opacity="0.5" />
            </svg>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(300px) translateY(300px); opacity: 0; }
        }
        @keyframes fallRock {
          0% { 
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% { 
            transform: translateY(60vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>

      {/* Footer */}
      <footer className="absolute -bottom-2 left-0 right-0 z-20 px-2 py-6 pb-12 bg-black/40 backdrop-blur-3xl bg-gradient-to-r from-black via-transparent to-black">
        <div className="max-w-7xl mx-auto">
          {/* Links */}
          <div className="grid grid-cols-3 gap-3 mb-10 text-gray-200">
            <div>
              <h3 className="text-lg font-semibold mb-3">Navigation</h3>
              <div className="space-y-2">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Access</h3>
              <div className="space-y-2">
                <Link href="/login" className="block hover:text-white transition-colors">Login</Link>
                <Link href="/register" className="block hover:text-white transition-colors">Register</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Dashboards</h3>
              <div className="space-y-2">
                <Link href="/overman" className="block hover:text-white transition-colors">Overman Portal</Link>
                <Link href="/admin" className="block hover:text-white transition-colors">Control Head Portal</Link>
              </div>
            </div>
          </div>

          {/* Copyright and Powered by */}
          <div className="border-t border-white/10 pt-4 text-gray-300">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p>&copy; 2025 Rhinore. All rights reserved.</p>
              <p className="text-sm">Powered by Intelligent IoT, Cloud & AI Analytics.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
