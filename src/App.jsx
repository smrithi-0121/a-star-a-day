import React, { useState, useEffect } from 'react';
import { Star, Calendar, Globe, Sparkles, Rocket, Search, BookMarked, Moon, Sun } from 'lucide-react';

const CosmicaApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [apodData, setApodData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [missions, setMissions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notebook, setNotebook] = useState('');
  const [language, setLanguage] = useState('en');
  const [eulogy, setEulogy] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({ name: 'Space Explorer', achievements: [] });

  // NASA API Key - Replace with your actual key
  const NASA_API_KEY = 'DEMO_KEY'; // Get free key at api.nasa.gov

  // Translations
  const translations = {
    en: {
      title: 'Cosmica',
      subtitle: 'Your Daily Portal Into the Universe',
      home: 'Home',
      missions: 'Missions',
      favorites: 'Favorites',
      notebook: 'Star Notebook',
      apodTitle: 'Astronomy Picture of the Day',
      generateEulogy: 'Generate Cosmic Eulogy',
      saveToFavorites: 'Save to Favorites',
      explanation: 'Explanation',
      search: 'Search missions...',
      writeYourThoughts: 'Write your cosmic thoughts...',
    },
    ta: {
      title: 'காஸ்மிகா',
      subtitle: 'பிரபஞ்சத்திற்கான உங்கள் தினசரி வாயில்',
      home: 'முகப்பு',
      missions: 'பயணங்கள்',
      favorites: 'விருப்பங்கள்',
      notebook: 'நட்சத்திர குறிப்பேடு',
      apodTitle: 'நாளின் வானியல் படம்',
      generateEulogy: 'பிரபஞ்ச புகழ்மாலை உருவாக்கு',
      saveToFavorites: 'விருப்பங்களில் சேமி',
      explanation: 'விளக்கம்',
      search: 'பயணங்களைத் தேடு...',
      writeYourThoughts: 'உங்கள் பிரபஞ்ச எண்ணங்களை எழுதுங்கள்...',
    },
    es: {
      title: 'Cosmica',
      subtitle: 'Tu Portal Diario al Universo',
      home: 'Inicio',
      missions: 'Misiones',
      favorites: 'Favoritos',
      notebook: 'Cuaderno Estelar',
      apodTitle: 'Imagen Astronómica del Día',
      generateEulogy: 'Generar Elegía Cósmica',
      saveToFavorites: 'Guardar en Favoritos',
      explanation: 'Explicación',
      search: 'Buscar misiones...',
      writeYourThoughts: 'Escribe tus pensamientos cósmicos...',
    }
  };

  const t = translations[language];

  // Mock NASA Missions Data
  const mockMissions = [
    {
      id: 1,
      name: 'Mars Perseverance Rover',
      years: '2021 - Present',
      type: 'Robotic Exploration',
      summary: 'Searching for signs of ancient microbial life on Mars and collecting rock samples.',
      image: '🔴'
    },
    {
      id: 2,
      name: 'James Webb Space Telescope',
      years: '2021 - Present',
      type: 'Space Observatory',
      summary: 'Observing the universe in infrared to study galaxy formation and exoplanet atmospheres.',
      image: '🔭'
    },
    {
      id: 3,
      name: 'Artemis Program',
      years: '2024 - Ongoing',
      type: 'Human Spaceflight',
      summary: 'Returning humans to the Moon and establishing sustainable lunar exploration.',
      image: '🌙'
    },
    {
      id: 4,
      name: 'Voyager 1 & 2',
      years: '1977 - Present',
      type: 'Deep Space',
      summary: 'Exploring interstellar space, the farthest human-made objects from Earth.',
      image: '🛸'
    },
    {
      id: 5,
      name: 'Hubble Space Telescope',
      years: '1990 - Present',
      type: 'Space Observatory',
      summary: 'Revolutionary observations of distant galaxies, nebulae, and cosmic phenomena.',
      image: '✨'
    },
    {
      id: 6,
      name: 'Europa Clipper',
      years: '2024 - Future',
      type: 'Robotic Exploration',
      summary: 'Investigating Jupiter\'s moon Europa for potential conditions supporting life.',
      image: '🪐'
    }
  ];

  // Fetch APOD data
  useEffect(() => {
    fetchAPOD(selectedDate);
    setMissions(mockMissions);
  }, [selectedDate]);

  const fetchAPOD = async (date) => {
    setLoading(true);
    try {
      // In production, this would call your backend endpoint
      // which then calls NASA API securely
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      );
      const data = await response.json();
      setApodData(data);
      
      // Achievement tracking
      if (!user.achievements.includes('first_apod')) {
        setUser(prev => ({
          ...prev,
          achievements: [...prev.achievements, 'first_apod']
        }));
      }
    } catch (error) {
      console.error('Error fetching APOD:', error);
      // Fallback data
      setApodData({
        title: 'Cosmic Wonder',
        explanation: 'Unable to load today\'s image. The universe is vast and mysterious.',
        url: 'https://apod.nasa.gov/apod/image/2312/M16_HubbleGendler_2200.jpg'
      });
    }
    setLoading(false);
  };

  // Generate AI Eulogy (Mock - In production, call your backend)
  const generateEulogy = async () => {
    setLoading(true);
    // This would call your backend endpoint which uses OpenAI API
    // Backend endpoint: POST /api/generate-eulogy
    // Body: { title, explanation, date }
    
    // Mock eulogy generation
    setTimeout(() => {
      const mockEulogies = [
        `In the cosmic tapestry of time, ${apodData?.title} stands as a monument to the eternal dance of light and matter. Born from the primordial chaos, this celestial wonder whispers secrets of galaxies long past, a testament to the universe's boundless creativity.`,
        `Here lies ${apodData?.title}, a cosmic masterpiece painted with the brushstrokes of supernovae and the dreams of dying stars. In its radiant beauty, we see the universe gazing back at itself, contemplating its own magnificence across the void of space and time.`,
        `Behold ${apodData?.title}, where physics becomes poetry and mathematics transforms into music. This celestial symphony echoes across billions of light-years, reminding us that we are not merely observers of the cosmos—we are the universe experiencing itself.`
      ];
      
      setEulogy(mockEulogies[Math.floor(Math.random() * mockEulogies.length)]);
      setLoading(false);
    }, 2000);
  };

  // Toggle favorites
  const toggleFavorite = (item) => {
    const exists = favorites.find(f => f.id === item.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
      if (favorites.length + 1 >= 5 && !user.achievements.includes('supernova_explorer')) {
        setUser(prev => ({
          ...prev,
          achievements: [...prev.achievements, 'supernova_explorer']
        }));
      }
    }
  };

  // Filter missions
  const filteredMissions = missions.filter(mission =>
    mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Floating stars animation
  const FloatingStars = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  // Home Page
  const HomePage = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          {t.apodTitle}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Calendar className="w-5 h-5 text-purple-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : apodData && (
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm">
          <div className="relative group">
            {apodData.media_type === 'video' ? (
              <iframe
                src={apodData.url}
                title={apodData.title}
                className="w-full h-96 object-cover"
                allowFullScreen
              />
            ) : (
              <img
                src={apodData.url}
                alt={apodData.title}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <button
              onClick={() => toggleFavorite({ ...apodData, id: selectedDate, type: 'apod' })}
              className="absolute top-4 right-4 bg-purple-600/80 p-3 rounded-full hover:bg-purple-500 transition-colors"
            >
              <Star
                className={`w-6 h-6 ${favorites.find(f => f.id === selectedDate) ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`}
              />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-white">{apodData.title}</h3>
            <p className="text-gray-300 leading-relaxed">{apodData.explanation}</p>
            
            <div className="flex gap-3">
              <button
                onClick={generateEulogy}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                {t.generateEulogy}
              </button>
            </div>

            {eulogy && (
              <div className="mt-6 p-6 bg-purple-950/50 rounded-xl border border-purple-500/30 animate-fade-in">
                <p className="text-purple-200 italic leading-relaxed">{eulogy}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Missions Page
  const MissionsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
        <Search className="w-5 h-5 text-purple-400" />
        <input
          type="text"
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-purple-400/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission, index) => (
          <div
            key={mission.id}
            className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all hover:scale-105 cursor-pointer backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-6xl mb-4">{mission.image}</div>
            <h3 className="text-xl font-bold text-white mb-2">{mission.name}</h3>
            <div className="text-purple-300 text-sm mb-3">{mission.years}</div>
            <div className="inline-block px-3 py-1 bg-purple-600/50 rounded-full text-xs text-purple-200 mb-3">
              {mission.type}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{mission.summary}</p>
            <button
              onClick={() => toggleFavorite({ ...mission, type: 'mission' })}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Star className={`w-5 h-5 ${favorites.find(f => f.id === mission.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              {favorites.find(f => f.id === mission.id) ? 'Saved' : 'Save Mission'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Favorites Page
  const FavoritesPage = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Your Cosmic Collection</h2>
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Star className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No favorites yet. Start exploring the cosmos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((item, index) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.type === 'apod' ? (
                <>
                  <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3">{item.explanation}</p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-3">{item.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-300 text-sm">{item.summary}</p>
                </>
              )}
              <button
                onClick={() => toggleFavorite(item)}
                className="mt-4 text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                Remove from favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Notebook Page
  const NotebookPage = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t.notebook}
        </h2>
        <p className="text-gray-400">Record your cosmic journey and reflections</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
        <textarea
          value={notebook}
          onChange={(e) => setNotebook(e.target.value)}
          placeholder={t.writeYourThoughts}
          className="w-full h-96 bg-purple-950/30 border border-purple-500/30 rounded-lg p-6 text-white placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          style={{ cursor: 'text' }}
        />
        <div className="mt-4 flex justify-between items-center text-purple-400 text-sm">
          <span>{notebook.length} characters</span>
          <div className="flex gap-2">
            {user.achievements.includes('first_apod') && (
              <span className="px-3 py-1 bg-purple-600/50 rounded-full text-xs">🌟 First APOD Viewed</span>
            )}
            {user.achievements.includes('supernova_explorer') && (
              <span className="px-3 py-1 bg-pink-600/50 rounded-full text-xs">💫 Supernova Explorer</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 text-white relative overflow-hidden">
      <FloatingStars />
      
      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/30 backdrop-blur-sm bg-purple-950/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-purple-300 mt-1">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ta' : language === 'ta' ? 'es' : 'en')}
                className="flex items-center gap-2 bg-purple-600/50 px-4 py-2 rounded-lg hover:bg-purple-500/50 transition-colors"
              >
                <Globe className="w-5 h-5" />
                {language.toUpperCase()}
              </button>
            </div>
          </div>
          
          <nav className="flex gap-2">
            {[
              { id: 'home', label: t.home, icon: Rocket },
              { id: 'missions', label: t.missions, icon: Moon },
              { id: 'favorites', label: t.favorites, icon: Star },
              { id: 'notebook', label: t.notebook, icon: BookMarked }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  currentPage === id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                    : 'bg-purple-900/30 hover:bg-purple-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'missions' && <MissionsPage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'notebook' && <NotebookPage />}
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CosmicaApp;