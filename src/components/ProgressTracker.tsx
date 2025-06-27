import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

interface WorkoutLog {
  id: string;
  date: string;
  exercises: string[];
  duration: number;
  notes: string;
}

export default function ProgressTracker() {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Track Your Progress
          </h2>
          <p className="text-xl text-gray-600">
            Log your workouts and see your fitness journey unfold
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalWorkouts}</p>
                <p className="text-gray-600">Total Workouts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalHours}h</p>
                <p className="text-gray-600">Total Hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{averageDuration}min</p>
                <p className="text-gray-600">Avg Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Log Workout Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsLogging(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Log New Workout
          </button>
        </div>

        {/* Log Workout Form */}
        {isLogging && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Log Your Workout</h3>
            <form onSubmit={handleLogWorkout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercises (comma separated)
                </label>
                <input
                  type="text"
                  value={currentLog.exercises}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, exercises: e.target.value }))}
                  placeholder="Push-ups, Squats, Planks"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={currentLog.duration}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="45"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={currentLog.notes}
                  onChange={(e) => setCurrentLog(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How did it feel? Any achievements?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Save Workout
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogging(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Workout History */}
        {workoutLogs.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Workouts</h3>
            <div className="space-y-4">
              {workoutLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="border-l-4 border-green-500 pl-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{log.date}</p>
                    <span className="text-sm text-gray-500">{log.duration} minutes</span>
                  </div>
                  <p className="text-gray-700 mb-1">
                    <strong>Exercises:</strong> {log.exercises.join(', ')}
                  </p>
                  {log.notes && (
                    <p className="text-gray-600 text-sm italic">{log.notes}</p>
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