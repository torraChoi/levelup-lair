import { useState } from "react";
import { Plus, Filter, Grid, List, Table, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Tasks() {
  const [viewMode, setViewMode] = useState("kanban");

  // Mock data - will be replaced with real data from Supabase
  const projects = [
    { id: 1, name: "Website Redesign", status: "active", tasks: 12, completed: 8 },
    { id: 2, name: "Mobile App", status: "planning", tasks: 8, completed: 2 },
    { id: 3, name: "Marketing Campaign", status: "completed", tasks: 15, completed: 15 },
  ];

  const tasks = [
    { 
      id: 1, 
      title: "Design user authentication flow", 
      status: "todo", 
      priority: "high",
      project: "Website Redesign",
      dueDate: "2024-01-15",
      tags: ["design", "auth"]
    },
    { 
      id: 2, 
      title: "Implement API endpoints", 
      status: "in-progress", 
      priority: "medium",
      project: "Website Redesign",
      dueDate: "2024-01-18",
      tags: ["backend", "api"]
    },
    { 
      id: 3, 
      title: "Write unit tests", 
      status: "done", 
      priority: "low",
      project: "Website Redesign",
      dueDate: "2024-01-12",
      tags: ["testing"]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-muted";
      case "in-progress": return "bg-primary/10";
      case "done": return "bg-success/10";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks & Projects</h1>
          <p className="text-muted-foreground">
            Organize and track your work across different projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
          />
        </div>
        
        {/* View Mode Toggle */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
          <TabsList>
            <TabsTrigger value="kanban" className="gap-2">
              <Grid className="h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <Table className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Projects Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="gradient-card hover-lift cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge 
                  variant={project.status === "completed" ? "default" : "secondary"}
                  className="w-fit"
                >
                  {project.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{project.completed}/{project.tasks} tasks</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tasks View */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="kanban" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              {/* To Do Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-center p-3 bg-muted/50 rounded-lg">
                  To Do ({tasks.filter(t => t.status === "todo").length})
                </h3>
                {tasks.filter(task => task.status === "todo").map((task) => (
                  <Card key={task.id} className="gradient-card hover-lift cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                          <span className="text-muted-foreground">
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-center p-3 bg-primary/10 rounded-lg">
                  In Progress ({tasks.filter(t => t.status === "in-progress").length})
                </h3>
                {tasks.filter(task => task.status === "in-progress").map((task) => (
                  <Card key={task.id} className="gradient-card hover-lift cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                          <span className="text-muted-foreground">
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Done Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-center p-3 bg-success/10 rounded-lg">
                  Done ({tasks.filter(t => t.status === "done").length})
                </h3>
                {tasks.filter(task => task.status === "done").map((task) => (
                  <Card key={task.id} className="gradient-card hover-lift cursor-pointer opacity-75">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium line-through">{task.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                          <span className="text-muted-foreground">
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <Card className="gradient-card">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <Card className="gradient-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Task</th>
                        <th className="p-4 font-medium">Project</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Priority</th>
                        <th className="p-4 font-medium">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-4">{task.title}</td>
                          <td className="p-4 text-muted-foreground">{task.project}</td>
                          <td className="p-4">
                            <Badge variant="outline">{task.status}</Badge>
                          </td>
                          <td className="p-4">
                            <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                          </td>
                          <td className="p-4 text-muted-foreground">{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card key={task.id} className="gradient-card hover-lift cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription>{task.project}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <Badge variant="outline">{task.status}</Badge>
                      <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}