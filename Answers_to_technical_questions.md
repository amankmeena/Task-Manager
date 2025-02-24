# Technical Questions

### 1. How long did you spend on the coding test?
- Approx. 4-6 hours.

### 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
- React 18's automatic batching feature was most useful in this task manager application. It improves performance by batching multiple state updates into a single re-render.

**Example from our TaskList component:**
```jsx
// When marking a task complete and updating filters simultaneously
const handleTaskComplete = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId ? {...task, completed: true} : task
    ));
    // These updates are automatically batched into a single render in React 18
    setFilterStatus('Complete');  
    setActiveTab('completed');   
};
```
Previously in React 17, these state updates would cause multiple re-renders, but React 18 automatically batches them for better performance.

### 3. How would you track down a performance issue in production? Have you ever had to do this?
- Yes, I have tracked performance issues in production. Here's how I would approach it in our Task Manager application:

1. **React DevTools Profiler:**
   - Profile component render times to identify which components are re-rendering unnecessarily
   - In our app, this helped optimize the TaskList component by implementing React.memo for task items

2. **Chrome DevTools Performance Tab:**
   - Record timeline during slow operations
   - Analyze JavaScript execution time, especially during task filtering and sorting
   - Check for layout thrashing when updating task status

3. **Implementation of Performance Monitoring:**
   ```jsx
   // Example of performance monitoring in our TaskList component
   const handleTaskComplete = (taskId) => {
     performance.mark('taskComplete-start');
     
     setTasks(prevTasks => prevTasks.map(task => 
       task.id === taskId ? {...task, completed: true} : task
     ));
     
     performance.mark('taskComplete-end');
     performance.measure('Task Complete Time', 
       'taskComplete-start', 
       'taskComplete-end'
     );
   };
   ```
   
4. **Browser Memory Tab:**
   - Monitor memory usage patterns
   - Check for memory leaks in task filtering and search functionality
   - Ensure proper cleanup of event listeners and timers

### 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

1. **Enhanced Task Organization:**
   - Task categories/tags for better organization
   - Drag-and-drop functionality for task reordering
   - Subtasks support within main tasks
   - Task templates for recurring tasks

2. **Improved User Experience:**
   - Dark mode theme support
   - Customizable task priority levels
   - Bulk task actions (delete, complete, move)
   - Rich text editor for task descriptions

3. **Collaboration Features:**
   - Task sharing between users
   - Comments on tasks
   - Task assignment capabilities
   - Team workspaces

4. **Data & Integration:**
   - Data export/import functionality
   - Calendar integration
   - Email notifications for due tasks
   - Task statistics and productivity insights

5. **Technical Improvements:**
   - Better state management with Redux
   - Unit tests for critical components
   - Keyboard shortcuts for common actions