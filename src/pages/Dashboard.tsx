import { useState } from "react";
import { Plus, Calendar, CheckCircle, Target, Clock, Coins, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  // Mock data - will be replaced with real data from Supabase
  const userStats = {
    level: 12,
    xp: 2840,
    nextLevelXP: 3600,
    coins: 150,
    tasksCompleted: 24,
    streakDays: 7,
    studyHours: 12.5,
    pomodoroSessions: 18
  };

  const recentTasks = [
    { id: 1, title: "Complete project wireframes", completed: true, xp: 50 },
    { id: 2, title: "Review code documentation", completed: false, xp: 30 },
    { id: 3, title: "Team standup meeting", completed: true, xp: 15 },
  ];

  const todayHabits = [
    { id: 1, name: "Morning Exercise", completed: true, streak: 7 },
    { id: 2, name: "Read 30 minutes", completed: true, streak: 12 },
    { id: 3, name: "Meditation", completed: false, streak: 5 },
    { id: 4, name: "Drink 8 glasses water", completed: false, streak: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your productivity overview.
          </p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Add
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {userStats.level}</div>
            <div className="mt-2">
              <Progress 
                value={(userStats.xp / userStats.nextLevelXP) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {userStats.xp}/{userStats.nextLevelXP} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coins Earned</CardTitle>
            <Coins className="h-4 w-4 coin-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{userStats.coins}</div>
            <p className="text-xs text-muted-foreground">
              +25 earned today
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{userStats.streakDays} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it going!
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">
              5 more to complete
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Tasks */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Tasks
            </CardTitle>
            <CardDescription>
              Your latest task activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.title}
                  </span>
                </div>
                <Badge variant={task.completed ? "secondary" : "outline"} className="gap-1">
                  <Coins className="h-3 w-3" />
                  {task.xp}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Today's Habits */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Today's Habits
            </CardTitle>
            <CardDescription>
              Track your daily progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayHabits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    habit.completed 
                      ? 'bg-success border-success' 
                      : 'border-muted-foreground'
                  }`}>
                    {habit.completed && <CheckCircle className="h-3 w-3 text-success-foreground" />}
                  </div>
                  <span className={habit.completed ? 'text-muted-foreground' : ''}>
                    {habit.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {habit.streak} day streak
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Habits
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="gradient-card hover-lift cursor-pointer">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Start Pomodoro</h3>
            <p className="text-sm text-muted-foreground">Begin a focused work session</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift cursor-pointer">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold">Journal Entry</h3>
            <p className="text-sm text-muted-foreground">Reflect on your day</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover-lift cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold">Plan Study Session</h3>
            <p className="text-sm text-muted-foreground">Schedule your learning</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}