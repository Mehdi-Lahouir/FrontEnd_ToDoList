/**
 * CRUD Todo-list : création, édition et suppression d’une tâche.
 * Le bouton ✓ n’est actif que si le nom a changé.
 */

import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Task } from '../index';

type TaskRow = Task & {
  initialName: string,
};

const TodoPage = () => {
  const api = useFetch();

  const [ tasks, setTasks ] = useState<TaskRow[]>([]);

  const [ newName, setNewName ] = useState('');

  const fetchTasks = async () => {
    const data: Task[] = await api.get('/tasks');
    setTasks(data.map((t) => ({ ...t, initialName: t.name })));
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleSave = async (task?: TaskRow) => {
    if (task) {
      await api.patch(`/tasks/${task.id}`, { name: task.name });
    } else {
      if (!newName.trim()) return;
      await api.post('/tasks', { name: newName });
      setNewName('');
    }
    fetchTasks();
  };

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const clone = [ ...tasks ];
    clone[index] = { ...clone[index], name: e.target.value };
    setTasks(clone);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task, i) => {
          const isDirty = task.name.trim() !== task.initialName.trim() && task.name.trim() !== '';

          return (
            <Box
              key={task.id}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              gap={1}
              width="100%"
            >
              <TextField
                size="small"
                value={task.name}
                onChange={handleChange(i)}
                fullWidth
                sx={{ maxWidth: 350 }}
              />

              <Box>
                <IconButton
                  color="success"
                  disabled={!isDirty}
                  onClick={() => handleSave(task)}
                >
                  <Check />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(task.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        {}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          gap={1}
        >
          <TextField
            size="small"
            placeholder="Nouvelle tâche…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={() => handleSave()}>
            Ajouter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
