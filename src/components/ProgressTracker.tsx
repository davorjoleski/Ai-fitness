import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, Plus } from 'lucide-react';

interface WorkoutLog {
  id: string;
  date: string;
  exercises: string[];
  duration: number;
  notes: string;
}

interface ProgressTrackerProps {
  isDarkMode?: boolean;
}

export default function ProgressTracker({ isDarkMode = false }: ProgressTrackerProps) {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [currentLog, setCurrentLog] = useState({
    exercises: '',
    duration: '',
    notes: ''
  });

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLog: WorkoutLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      exercises: currentLog.exercises.split(',').map(ex => ex.trim()),
      duration: parseInt(currentLog.duration),
      notes: currentLog.notes
    };

    setWorkoutLogs(prev => [newLog, ...prev]);
    setCurrentLog({ exercises: '', duration: '', notes: '' });
    setIsLogging(false);
  };

  const totalWorkouts = workoutLogs.length;
  const totalHours = workoutLogs.reduce((sum, log) => sum + log.duration, 0);
  const averageDuration = totalWorkouts > 0 ? Math.round(totalHours / totalWorkouts) : 0;

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center animate-bounce-subtle">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            TRACK YOUR PROGRESS
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Log your workouts and see your fitness journey unfold with detailed analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl border border-blue-200 hover-lift animate-fade-in-up">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{totalWorkouts}</p>
                <p className="text-gray-600 font-medium">Total Workouts</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl border border-blue-200 hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{totalHours}h</p>
                <p className="text-gray-600 font-medium">Total Hours</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl border border-blue-200 hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900">{averageDuration}min</p>
                <p className="text-gray-600 font-medium">Avg Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Log Workout Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsLogging(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Log New Workout
          </button>
        </div>

        {/* Log Workout Form */}
        {isLogging && (
          <div className={`rounded-3xl p-8 shadow-2xl mb-8 max-w-2xl mx-auto border animate-fade-in-up hover-lift ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Log Your Workout
            </h3>
            <form onSubmit={handleLogWorkout} className="space-y-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Exercises (comma separated)
                </label>
                <input
                  type="text"
                  value={currentLog.exercises}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, exercises: e.target.value }))}
                  placeholder="Push-ups, Squats, Planks"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={currentLog.duration}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="45"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Notes (optional)
                </label>
                <textarea
                  value={currentLog.notes}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How did it feel? Any achievements?"
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Save Workout
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogging(false)}
                  className={`flex-1 font-bold py-3 px-6 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Workout History */}
        {workoutLogs.length > 0 && (
          <div className={`rounded-3xl p-8 shadow-xl border animate-fade-in-up hover-lift ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Workouts
            </h3>
            <div className="space-y-4">
              {workoutLogs.slice(0, 5).map((log) => (
                <div key={log.id} className={`border-l-4 border-blue-500 pl-6 py-4 rounded-r-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-bold text-lg ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {log.date}
                    </p>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      isDarkMode 
                        ? 'text-gray-300 bg-gray-600' 
                        : 'text-gray-500 bg-white'
                    }`}>
                      {log.duration} minutes
                    </span>
                  </div>
                  <p className={`mb-1 font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <strong>Exercises:</strong> {log.exercises.join(', ')}
                  </p>
                  {log.notes && (
                    <p className={`text-sm italic ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {log.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}