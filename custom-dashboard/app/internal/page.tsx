'use client';

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight, LayoutDashboard, Clock, MessageSquare, FileText, GitBranch, Search, Bell } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Timeline from './timeline'

const afpData = [
  { date: '8/27/2024', value: 327.6 },
  { date: '8/13/2024', value: 177.8 },
  { date: '8/7/2024', value: 163.2 },
  { date: '7/29/2024', value: 167.7 },
  { date: '7/19/2024', value: 166.4 },
  { date: '6/12/2024', value: 151.5 },
  { date: '5/8/2024', value: 62.59 },
  { date: '4/30/2024', value: 45.22 },
]

export default function PatientSummaryDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'timeline'>('dashboard')

  const renderDashboard = () => (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white p-4 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center">
            <span className="text-green-500">CARING</span>
            <span className="text-blue-500">HAND</span>
          </h2>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentPage('dashboard')}>
            <LayoutDashboard className="mr-2" />
            {!sidebarCollapsed && 'Overview'}
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentPage('timeline')}>
            <Clock className="mr-2" />
            {!sidebarCollapsed && 'Timeline'}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2" />
            {!sidebarCollapsed && 'Chat'}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2" />
            {!sidebarCollapsed && 'Documents'}
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white p-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold">Zara Johnson - NGGCT</h1>
          <div className="flex items-center space-x-4">
            <Search />
            <Bell />
          </div>
        </header>

        {/* Dashboard content */}
        <ScrollArea className="h-[calc(100vh-5rem)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Patient Summary */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Patient Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Name:</strong> Zara Johnson</p>
                <p><strong>DOB:</strong> 4/24/2014 (10 years old)</p>
                <p><strong>MRN:</strong> 85308793</p>
                <p><strong>Primary Diagnosis:</strong> Recurrent intracranial non-germinomatous germ cell tumor</p>
                <p><strong>Current Treatment:</strong> Everolimus 5 mg daily, supportive care</p>
                <p><strong>Recent Events:</strong> Third metastatic recurrence, completed third round of gamma knife therapy in June 2024</p>
              </CardContent>
            </Card>

            {/* AFP Chart */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Serum AFP Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={afpData.reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Lab Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Lab Results (10/18/2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>WBC: 7.6 TH/mm3</li>
                  <li>Hemoglobin: 7.4 gm/dL (Low)</li>
                  <li>Platelet Count: 199 TH/mm3</li>
                  <li>TSH: 2.380 uIU/mL</li>
                  <li>Total Cholesterol: 250 mg/dL (High)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Chronological Overview */}
            <Card className="col-span-full md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>10/18/2024: MRI showing progression of metastatic lesions</li>
                  <li>8/15/2024: Admitted for erythema nodosum, discontinued erlotinib</li>
                  <li>8/1/2024: Started erlotinib</li>
                  <li>6/24/2024: Admitted for PJP pneumonia</li>
                  <li>6/12/2024: Completed third round of gamma knife therapy</li>
                </ul>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>Everolimus 5 mg daily</li>
                  <li>Levothyroxine (on hold)</li>
                  <li>Bactrim (prophylaxis)</li>
                  <li>Supplemental nutrition via NG tube</li>
                </ul>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>Erlotinib: Rash, erythema nodosum, fever</li>
                  <li>Platelets: Swelling (eyes, abdomen)</li>
                  <li>Red Blood Cells: Unilateral eye swelling</li>
                  <li>Chlorhexidine Gluconate: Rash</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  return (
    <>
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'timeline' && <Timeline onBack={() => setCurrentPage('dashboard')} />}
    </>
  )
}
