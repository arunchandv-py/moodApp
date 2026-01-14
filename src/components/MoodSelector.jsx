import React, { useState } from 'react';

function MoodSelector({ primaryMoods, selectedMood, onMoodSelect, moodColors }) {
  const [selectedPrimaryMood, setSelectedPrimaryMood] = useState(null);

  const handlePrimaryMoodSelect = (primaryMood) => {
    setSelectedPrimaryMood(primaryMood);
    onMoodSelect(null);
  };

  const handleSpecificMoodSelect = (mood) => {
    onMoodSelect(mood);
  };

  return (
    <div className="p-4">
      {!selectedPrimaryMood && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(primaryMoods).map((primaryMood) => (
              <button
                key={primaryMood}
                onClick={() => handlePrimaryMoodSelect(primaryMood)}
                className={`
                  p-4 rounded-lg text-center font-bold
                  ${
                    primaryMood === 'positive' 
                      ? 'bg-green-100 text-green-800'
                      : primaryMood === 'negative'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                `}
              >
                {primaryMood.charAt(0).toUpperCase() + primaryMood.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPrimaryMood && !selectedMood && (
        <div>
          <button 
            onClick={() => setSelectedPrimaryMood(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Select a more specific mood
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {primaryMoods[selectedPrimaryMood].map((mood) => (
              <button
                key={mood}
                onClick={() => handleSpecificMoodSelect(mood)}
                className={`
                  p-4 rounded-lg text-center font-bold
                  ${moodColors[mood] || 'bg-gray-100'}
                  hover:opacity-80
                `}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;
