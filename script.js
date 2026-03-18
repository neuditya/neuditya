body {
  background: #121212;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  text-align: center;
}

.vinyl-container {
  margin: 20px 0;
}

.vinyl {
  width: 200px;
  border-radius: 50%;
  transition: transform 0.3s linear;
}

.spinning {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

#trackName {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}

select {
  padding: 8px 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
}

.controls button {
  padding: 10px 15px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 50px;
  border: none;
  background: #1db954;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.controls button:hover {
  background: #1ed760;
}

/* Visualizer bars */
#visualizer {
  display: block;
  margin-top: 20px;
  background: #000;
  border-radius: 5px;
}
