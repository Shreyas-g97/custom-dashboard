import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

// Mock data for demonstration
const data = [
  { date: '2024-01-01', afp: 50, phosphorus: 3.5, magnesium: 2.0, hemoglobin: 12, wbc: 7.5 },
  { date: '2024-02-01', afp: 75, phosphorus: 3.2, magnesium: 1.8, hemoglobin: 11, wbc: 8.0 },
  { date: '2024-03-01', afp: 100, phosphorus: 3.0, magnesium: 1.7, hemoglobin: 10, wbc: 9.0 },
  { date: '2024-04-01', afp: 150, phosphorus: 2.8, magnesium: 1.6, hemoglobin: 9, wbc: 10.0 },
  { date: '2024-05-01', afp: 200, phosphorus: 2.5, magnesium: 1.5, hemoglobin: 8, wbc: 11.0 },
]

const normalRanges = {
  afp: { min: 0, max: 100 },
  phosphorus: { min: 2.5, max: 4.5 },
  magnesium: { min: 1.7, max: 2.2 },
  hemoglobin: { min: 12, max: 15.5 },
  wbc: { min: 4.5, max: 11.0 },
}

// Add this type definition
type DataKey = keyof typeof normalRanges;

// Update the ChartProps interface
type ChartProps = {
  data: any[]
  dataKey: DataKey
  color: string
  syncId: string
  yAxisDomain: [number, number]
}

const SynchronizedChart: React.FC<ChartProps> = ({ data, dataKey, color, syncId, yAxisDomain }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data} syncId={syncId} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={yAxisDomain} />
      <Tooltip />
      <Line type="monotone" dataKey={dataKey} stroke={color} fill={color} />
      <ReferenceLine y={normalRanges[dataKey].min} stroke="red" strokeDasharray="3 3" />
      <ReferenceLine y={normalRanges[dataKey].max} stroke="red" strokeDasharray="3 3" />
    </LineChart>
  </ResponsiveContainer>
)

export default function Timeline({ onBack }: { onBack: () => void }) {
  const [activePoint, setActivePoint] = useState<number | null>(null)

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined) {
      setActivePoint(e.activeTooltipIndex)
    }
  }

  const handleMouseLeave = () => {
    setActivePoint(null)
  }

  return (
    <div className="h-screen bg-gray-100 p-6 overflow-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Monitoring Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">AFP Levels</h3>
              <SynchronizedChart
                data={data}
                dataKey="afp"
                color="#8884d8"
                syncId="patientData"
                yAxisDomain={[0, 250]}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phosphorus Levels</h3>
              <SynchronizedChart
                data={data}
                dataKey="phosphorus"
                color="#82ca9d"
                syncId="patientData"
                yAxisDomain={[0, 5]}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Magnesium Levels</h3>
              <SynchronizedChart
                data={data}
                dataKey="magnesium"
                color="#ffc658"
                syncId="patientData"
                yAxisDomain={[0, 3]}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Hemoglobin Levels</h3>
              <SynchronizedChart
                data={data}
                dataKey="hemoglobin"
                color="#ff8042"
                syncId="patientData"
                yAxisDomain={[0, 20]}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">White Blood Cell Count</h3>
              <SynchronizedChart
                data={data}
                dataKey="wbc"
                color="#0088fe"
                syncId="patientData"
                yAxisDomain={[0, 15]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}