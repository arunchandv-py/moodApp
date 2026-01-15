import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import MoodSelector from './components/MoodSelector';
import { format } from 'date-fns';

// Mood Hierarchies
const PRIMARY_MOODS = {
  positive: ['Happy', 'Excited', 'Calm', 'Grateful'],
  negative: ['Sad', 'Angry', 'Anxious', 'Frustrated'],
  neutral: ['Tired', 'Okay', 'Indifferent', 'Contemplative']
};

const MOOD_COLORS = {
  Happy: 'bg-yellow-200',
  Excited: 'bg-green-200',
  Calm: 'bg-blue-200',
  Grateful: 'bg-teal-200',
  Sad: 'bg-gray-300',
  Angry: 'bg-red-300',
  Anxious: 'bg-purple-300',
  Frustrated: 'bg-orange-300',
  Tired: 'bg-stone-200',
  Okay: 'bg-gray-100',
  Indifferent: 'bg-slate-200',
  Contemplative: 'bg-cyan-100'
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState({});
  const [currentMood, setCurrentMood] = useState(null);
  const [statement, setStatement] = useState('');

  useEffect(() => {
    // Simulate loading
    setIsLoaded(true);
    console.log('App component mounted');

    // Load mood entries from localStorage
    const storedEntries = window.localStorage.getItem('moodEntries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        setMoodEntries(parsedEntries);
        console.log('Loaded mood entries:', parsedEntries);
      } catch (error) {
        console.error('Error parsing mood entries:', error);
      }
    }
  }, []);

  const saveMoodEntry = () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const newEntries = {
      ...moodEntries,
      [formattedDate]: { mood: currentMood, statement }
    };

    try {
      setMoodEntries(newEntries);
      window.localStorage.setItem('moodEntries', JSON.stringify(newEntries));
      console.log('Saved mood entry:', newEntries);
      
      // Reset form
      setCurrentMood(null);
      setStatement('');
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800">Loading Mood Tracker...</h1>
          <p className="text-blue-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <header className="bg-blue-100 p-4 text-center">
          <h1 className="text-2xl font-bold text-blue-800">Mood Journal</h1>
        </header>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <MoodSelector 
                  primaryMoods={PRIMARY_MOODS}
                  selectedMood={currentMood}
                  onMoodSelect={setCurrentMood}
                  moodColors={MOOD_COLORS}
                />

                {currentMood && (
                  <div className="p-4">
                    <textarea 
                      placeholder={`What made you feel ${currentMood}?`}
                      className="w-full p-2 border rounded-lg h-24"
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                    />
                    <button 
                      onClick={saveMoodEntry}
                      className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                      Save Mood
                    </button>
                  </div>
                )}

                <Calendar 
                  moodEntries={moodEntries} 
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  moodColors={MOOD_COLORS}
                />
              </>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;