import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

interface Submission {
  id: string;
  type: string;
  condition: string;
  size: string;
  material: string;
  createdAt: string;
  recommendation: string;
}

let apparelSubmissions: Submission[] = [];

const log = (message: string, data?: any) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    log(`Received ${req.method} request`, { headers: req.headers, body: req.body, query: req.query });

    if (req.method === 'POST') {
      log('Processing POST request', req.body);
      const { type, condition, size, material } = req.body;

      if (!type || !condition || !size || !material) {
        log('Missing required fields', { type, condition, size, material });
        return res.status(400).json({
          error: 'Missing required fields',
          details: { type, condition, size, material }
        });
      }

      const submission: Submission = {
        id: uuidv4(),
        type,
        condition,
        size,
        material,
        createdAt: new Date().toISOString(),
        recommendation: getRecommendation(condition, material),
      };

      apparelSubmissions.push(submission);
      log('Submission added successfully', submission);

      return res.status(201).json({ submission });
    } else if (req.method === 'GET') {
      log('Processing GET request');
      return res.status(200).json(apparelSubmissions);
    } else {
      log('Method not allowed', { method: req.method });
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    log('Unhandled error', {
      error: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

const getRecommendation = (condition: string, material: string): string => {
  if (condition === 'good') {
    return 'Donate to a local charity or sell on a second-hand platform';
  } else if (condition === 'worn' && (material.toLowerCase() === 'cotton' || material.toLowerCase() === 'wool')) {
    return 'Recycle at a textile recycling center or use for DIY projects';
  } else if (condition === 'damaged') {
    return 'Cut into rags for cleaning or dispose at a proper waste management facility';
  } else {
    return 'Check with local recycling centers for specific disposal instructions';
  }
};
