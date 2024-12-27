'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, DollarSign, TrendingDown, Bell } from 'lucide-react';

// Sample data structure
const sampleData = [
  { date: '2024-01-01', usage: 30, cost: 45 },
  { date: '2024-01-02', usage: 28, cost: 42 },
  { date: '2024-01-03', usage: 35, cost: 52.5 },
  { date: '2024-01-04', usage: 32, cost: 48 },
  { date: '2024-01-05', usage: 25, cost: 37.5 },
  { date: '2024-01-06', usage: 27, cost: 40.5 },
  { date: '2024-01-07', usage: 29, cost: 43.5 },
];

const EnergyDashboard = () => {
  const [currentView] = useState('daily');
  const averageUsage = sampleData.reduce((acc, curr) => acc + curr.usage, 0) / sampleData.length;
  const totalCost = sampleData.reduce((acc, curr) => acc + curr.cost, 0);
  const predictedBill = totalCost * 1.1;

  const suggestions = [
    'Switch to LED bulbs to save up to 75% on lighting costs',
    'Consider installing a smart thermostat',
    'Unplug devices when not in use to reduce standby power consumption',
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Energy Consumption Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Zap className="text-yellow-500" />
            <CardTitle>Current Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{averageUsage.toFixed(1)} kWh/day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <DollarSign className="text-green-500" />
            <CardTitle>Predicted Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${predictedBill.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <TrendingDown className="text-blue-500" />
            <CardTitle>Savings Target</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Energy Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#8884d8" name="Usage (kWh)" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#82ca9d" name="Cost ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="text-purple-500" />
            Energy Saving Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Alert key={index}>
                <AlertDescription>{suggestion}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyDashboard;