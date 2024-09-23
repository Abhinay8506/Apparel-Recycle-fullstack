import { useState, useEffect } from 'react';
import Button from '../components/ui/button';
import Select from '../components/ui/select';
import Table from '../components/ui/table';

type Submission = {
  id: string;
  type: string;
  condition: string;
  size: string;
  material: string;
  recommendation: string;
  createdAt: string;
};

export default function Home() {
  const [type, setType] = useState('');
  const [condition, setCondition] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');
  const [response, setResponse] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const handleSubmit = async () => {
    const res = await fetch('/api/submit-apparel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, condition, size, material }),
    });

    const data = await res.json();
    console.log('API Response:', data);

    if (res.ok) {
      setResponse(data.submission.recommendation);
      fetchSubmissions();
    } else {
      console.error('Submission error:', data);
    }
  };

  const fetchSubmissions = async () => {
    const res = await fetch('/api/submit-apparel');
    const data = await res.json();
    setSubmissions(data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <h1>Submit Your Apparel</h1>
      <form>
        <Select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={['Shirt', 'Pants', 'Jacket', 'Dress']}
        />
        <Select
          label="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={['good', 'worn', 'damaged', 'old']}
        />
        <Select
          label="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          options={['Small', 'Medium', 'Large', 'Extra Large']}
        />
        <Select
          label="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          options={['Cotton', 'Wool', 'Polyester', 'Silk']}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </form>

      {response && <p>Recommendation: {response}</p>}

      <h2>Your Submissions</h2>
      <div className="table-container">
        <Table
          headers={['ID', 'Type', 'Condition', 'Size', 'Material', 'Recommendation', 'Created At']}
          data={submissions.map(sub => [
            sub.id,
            sub.type,
            sub.condition,
            sub.size,
            sub.material,
            sub.recommendation,
            new Date(sub.createdAt).toLocaleString(),
          ])}
        />
      </div>
    </div>
  );
}
