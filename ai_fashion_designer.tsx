import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, Wand2, Share2, ShoppingBag, Heart, Menu, X, User, Shirt, Palette, Layers, TrendingUp, Save } from 'lucide-react';

const AIFashionDesigner = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('elegant');
  const [selectedFabric, setSelectedFabric] = useState('silk');
  const [selectedColor, setSelectedColor] = useState('#E8D5C4');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const styles = [
    { id: 'elegant', name: 'Elegant Evening', icon: '✨' },
    { id: 'casual', name: 'Casual Chic', icon: '👗' },
    { id: 'bohemian', name: 'Bohemian', icon: '🌸' },
    { id: 'formal', name: 'Formal Gown', icon: '👑' },
    { id: 'cocktail', name: 'Cocktail', icon: '🍸' },
    { id: 'vintage', name: 'Vintage', icon: '🎭' }
  ];

  const fabrics = [
    { id: 'silk', name: 'Silk', texture: 'Smooth & Luxurious' },
    { id: 'velvet', name: 'Velvet', texture: 'Rich & Elegant' },
    { id: 'chiffon', name: 'Chiffon', texture: 'Light & Flowing' },
    { id: 'satin', name: 'Satin', texture: 'Glossy & Refined' },
    { id: 'lace', name: 'Lace', texture: 'Delicate & Romantic' },
    { id: 'cotton', name: 'Cotton', texture: 'Soft & Breathable' }
  ];

  const colorPalette = [
    '#E8D5C4', '#C9ADA7', '#9A8C98', '#4A4E69', '#22223B',
    '#F2E9E4', '#C9ADA7', '#A0A0A0', '#6C757D', '#343A40',
    '#FFD700', '#FF69B4', '#8B4513', '#2F4F4F', '#1A1A1A'
  ];

  const trends = [
    { title: 'Pearl Embellishments', popularity: 95, season: 'Spring 2025' },
    { title: 'Asymmetric Cuts', popularity: 88, season: 'Spring 2025' },
    { title: 'Sustainable Fabrics', popularity: 92, season: 'Year-round' },
    { title: 'Balloon Sleeves', popularity: 79, season: 'Fall 2024' },
    { title: 'Metallic Accents', popularity: 85, season: 'Winter 2024' }
  ];

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert('Camera access denied. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setSelectedImage(imageData);
      stopCamera();
      generateAISuggestions();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        generateAISuggestions();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAISuggestions = () => {
    const suggestions = [
      {
        style: 'A-Line Evening Gown',
        fabric: 'Silk',
        color: '#C9ADA7',
        description: 'Perfect for your body type with flowing silhouette',
        confidence: 94
      },
      {
        style: 'Mermaid Cocktail Dress',
        fabric: 'Velvet',
        color: '#4A4E69',
        description: 'Accentuates curves with elegant draping',
        confidence: 89
      },
      {
        style: 'Empire Waist Gown',
        fabric: 'Chiffon',
        color: '#E8D5C4',
        description: 'Ethereal and comfortable for extended wear',
        confidence: 87
      }
    ];
    setAiSuggestions(suggestions);
  };

  const saveDesign = () => {
    const design = {
      id: Date.now(),
      style: selectedStyle,
      fabric: selectedFabric,
      color: selectedColor,
      image: selectedImage,
      timestamp: new Date().toLocaleString()
    };
    setSavedDesigns([...savedDesigns, design]);
    alert('Design saved successfully!');
  };

  const renderHome = () => (
    <div className="min-h-screen">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 opacity-70"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200, 173, 167, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(154, 140, 152, 0.1) 0%, transparent 50%)',
        }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8 inline-block">
            <Sparkles className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-7xl font-serif font-light mb-6 text-gray-800 tracking-tight">
            Atelier AI
          </h1>
          <p className="text-2xl text-gray-600 mb-4 font-light">
            Where Artificial Intelligence Meets Haute Couture
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Design your dream dress with AI-powered suggestions, virtual try-on, and personalized fashion intelligence
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => setCurrentPage('designer')}
              className="px-8 py-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Wand2 className="w-5 h-5" />
              Start Designing
            </button>
            <button
              onClick={() => setCurrentPage('tryon')}
              className="px-8 py-4 bg-white text-gray-800 rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center gap-3 text-lg border-2 border-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              Virtual Try-On
            </button>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif text-center mb-16 text-gray-800">
            Experience the Future of Fashion
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-amber-700" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">AI-Powered Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI analyzes your preferences, body type, and current trends to suggest the perfect dress designs tailored just for you
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-purple-700" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">Virtual Try-On</h3>
              <p className="text-gray-600 leading-relaxed">
                See how dresses look on you in real-time using our cutting-edge AR technology and body mapping algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-10 h-10 text-rose-700" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">Custom Creation</h3>
              <p className="text-gray-600 leading-relaxed">
                Mix and match fabrics, colors, styles, and accessories to create your unique masterpiece with unlimited possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesigner = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-12 text-gray-800">
          AI Design Studio
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-3 text-gray-800">
                <Shirt className="w-6 h-6" />
                Select Style
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedStyle === style.id
                        ? 'border-amber-600 bg-amber-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-2">{style.icon}</div>
                    <div className="font-medium text-gray-800">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-3 text-gray-800">
                <Layers className="w-6 h-6" />
                Choose Fabric
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fabrics.map(fabric => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedFabric === fabric.id
                        ? 'border-amber-600 bg-amber-50 shadow-lg'
                        : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold text-gray-800 mb-1">{fabric.name}</div>
                    <div className="text-sm text-gray-600">{fabric.texture}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-serif mb-6 flex items-center gap-3 text-gray-800">
                <Palette className="w-6 h-6" />
                Select Color
              </h2>
              <div className="flex flex-wrap gap-4">
                {colorPalette.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-16 h-16 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color
                        ? 'border-amber-600 shadow-lg scale-110'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-6">
              <h2 className="text-2xl font-serif mb-6 text-gray-800">Design Preview</h2>
              <div 
                className="w-full h-96 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: selectedColor }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
                <Shirt className="w-32 h-32 text-white opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm font-medium opacity-90">{styles.find(s => s.id === selectedStyle)?.name}</div>
                  <div className="text-xs opacity-75">{fabrics.find(f => f.id === selectedFabric)?.name}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={saveDesign}
                  className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Design
                </button>
                <button
                  onClick={() => setCurrentPage('tryon')}
                  className="w-full py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Try It On
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-800 rounded-xl hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Design
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTryOn = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-12 text-gray-800">
          Virtual Try-On Studio
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="aspect-video bg-gray-900 rounded-2xl mb-6 relative overflow-hidden">
                {!cameraActive && !selectedImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-6">Start your virtual fitting experience</p>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={startCamera}
                          className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <Camera className="w-5 h-5" />
                          Open Camera
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <Upload className="w-5 h-5" />
                          Upload Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {cameraActive && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button
                        onClick={capturePhoto}
                        className="px-8 py-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg"
                      >
                        Stop
                      </button>
                    </div>
                  </>
                )}
                
                {selectedImage && (
                  <>
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      AI Processing Active
                    </div>
                  </>
                )}
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {selectedImage && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Try Another Photo
                  </button>
                  <button
                    onClick={startCamera}
                    className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Use Camera
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2 text-gray-800">
                <Sparkles className="w-5 h-5 text-amber-600" />
                AI Suggestions
              </h3>
              {aiSuggestions.length === 0 ? (
                <p className="text-gray-500 text-sm">Upload a photo to receive personalized AI recommendations</p>
              ) : (
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{suggestion.style}</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {suggestion.confidence}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span className="bg-white px-2 py-1 rounded">{suggestion.fabric}</span>
                        <span 
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: suggestion.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2 text-gray-800">
                <Heart className="w-5 h-5 text-rose-600" />
                Saved Designs
              </h3>
              {savedDesigns.length === 0 ? (
                <p className="text-gray-500 text-sm">No saved designs yet</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedDesigns.map(design => (
                    <div key={design.id} className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: design.color }}
                      />
                      <div className="flex-grow min-w-0">
                        <div className="font-medium text-sm text-gray-800 truncate">
                          {styles.find(s => s.id === design.style)?.name}
                        </div>
                        <div className="text-xs text-gray-500">{design.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-4 text-gray-800">
          Curated Collection
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our AI-recommended designs and order custom pieces tailored to your style
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div key={item} className="group">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <button className="w-full py-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>
              <h3 className="font-serif text-xl mb-2 text-gray-800">Elegant Evening Dress</h3>
              <p className="text-gray-600 text-sm mb-2">Silk • Custom Tailored</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light text-gray-800">$2,499</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-8 text-gray-800">
          About Atelier AI
        </h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Atelier AI represents the convergence of haute couture and artificial intelligence, 
            bringing personalized fashion design to everyone. Our platform uses advanced machine 
            learning algorithms trained on decades of fashion history, current trends, and body 
            type analysis to create the perfect dress for every occasion.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">Our Technology</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span>Advanced AI body mapping and measurement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span>Real-time virtual try-on with AR technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span>Machine learning fashion trend analysis</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To democratize haute couture by making personalized, AI-designed fashion 
                accessible to everyone, while maintaining the highest standards of quality, 
                sustainability, and ethical production.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-serif mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            Current Fashion Trends
          </h3>
          <div className="space-y-4">
            {trends.map((trend, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{trend.title}</h4>
                  <span className="text-sm text-gray-600">{trend.season}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${trend.popularity}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{trend.popularity}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return renderHome();
      case 'designer': return renderDesigner();
      case 'tryon': return renderTryOn();
      case 'shop': return renderShop();
      case 'about': return renderAbout();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-serif text-gray-800 hover:text-amber-600 transition-colors"
          >
            Atelier AI
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('designer')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'designer' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              AI Designer
            </button>
            <button 
              onClick={() => setCurrentPage('tryon')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'tryon' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Virtual Try-On
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'shop' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Shop
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              About
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-3">
            <button 
              onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('designer'); setMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              AI Designer
            </button>
            <button 
              onClick={() => { setCurrentPage('tryon'); setMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              Virtual Try-On
            </button>
            <button 
              onClick={() => { setCurrentPage('shop'); setMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              Shop
            </button>
            <button 
              onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              About
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-serif mb-4">Atelier AI</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Redefining fashion with artificial intelligence and personalized design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">AI Designer</button></li>
                <li><button className="hover:text-white transition-colors">Virtual Try-On</button></li>
                <li><button className="hover:text-white transition-colors">Custom Orders</button></li>
                <li><button className="hover:text-white transition-colors">Collections</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Our Technology</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Press</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Size Guide</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Atelier AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIFashionDesigner;