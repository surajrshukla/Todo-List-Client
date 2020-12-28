import './App.css';
import Dashboard from './components/dashboard';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            <Dashboard />
          </Paper>
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
