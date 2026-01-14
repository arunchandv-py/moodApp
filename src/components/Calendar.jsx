import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format,
  isSameMonth,
  isToday
} from 'date-fns';

function Calendar({ moodEntries, selectedDate, onDateSelect, moodColors }) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map(day => (
          <div key={day} className="text-xs text-gray-500 font-semibold">
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const formattedDay = format(day, 'yyyy-MM-dd');
          const moodEntry = moodEntries[formattedDay];
          const moodColor = moodEntry ? moodColors[moodEntry.mood] : '';

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`
                p-2 rounded-lg 
                ${!isSameMonth(day, monthStart) ? 'text-gray-300' : ''}
                ${isToday(day) ? 'border-2 border-blue-500' : ''}
                ${moodColor || 'hover:bg-gray-100'}
                transition-all duration-200
              `}
            >
              {format(day, 'd')}
              {moodEntry && (
                <div 
                  className={`w-2 h-2 rounded-full mx-auto mt-1 ${moodColor}`}
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
