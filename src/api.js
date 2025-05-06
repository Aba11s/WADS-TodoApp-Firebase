// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tasks'; // Backend URL

export const getTasks = () => axios.get(API_BASE_URL);
export const addTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${API_BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
