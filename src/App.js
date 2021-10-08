import './App.css';
import {useState} from 'react';

// api key  06821bb5b1e3183693c2c75fe74cf745

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = '06821bb5b1e3183693c2c75fe74cf745';

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate');
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id='container'>
      <form onSubmit={convert}>
        <div>
          <label>EUR</label>&nbsp;
          <input type='number' step='0.01' value={eur} onChange={e => setEur(e.target.value)} />
          <output>&nbsp;{rate}</output>
        </div>
        <div>
          <label>GBP</label>
          <output>&nbsp;{gbp.toFixed(2)}</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
