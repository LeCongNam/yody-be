"use client"

import Link from "next/link"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const generateData = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().slice(5, 10),
      orders: Math.floor(Math.random() * 90) + 10,
    })
  }
  return data
}

const chartData = generateData()

const chartConfig = {
  orders: {
    label: "Số lượng đơn hàng",
    color: "#8884d8", // Add a color property
  },
}

// Fake data
const orders = Array.from({ length: 5 }, (_, i) => ({
  id: `ORD00${i + 1}`,
  customer: `Khách hàng ${i + 1}`,
  amount: Math.floor(Math.random() * 500) + 50,
  status: ["Đang xử lý", "Hoàn thành", "Hủy"][Math.floor(Math.random() * 3)],
}))

const users = Array.from({ length: 5 }, (_, i) => ({
  id: `USR00${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  date: new Date().toISOString().slice(0, 10),
}))

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tổng tiền trong tháng</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-500">
            50.000.000₫
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tổng user đăng ký</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-500">
            1.250
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng đã giao</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-500">
            820
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="bg-card p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-center mb-4">
          Số lượng đơn hàng 30 ngày
        </h2>
        <ChartContainer className="min-h-[300px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="orders"
                stroke={chartConfig.orders.color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Table */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Đơn hàng gần đây</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}₫</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Users Table */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">User đăng ký gần đây</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link
                      href={`/users/${user.id}`}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {user.id}
                    </Link>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
