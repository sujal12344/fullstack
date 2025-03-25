"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "./icons";

// Sample data
const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "12.5%",
    increasing: true,
  },
  { name: "Active Users", value: "2,338", change: "5.25%", increasing: true },
  { name: "Conversion Rate", value: "3.6%", change: "0.5%", increasing: false },
  { name: "Avg. Session", value: "2m 56s", change: "10.3%", increasing: true },
];

const recentActivity = [
  {
    user: "John Doe",
    action: "updated the sales report",
    time: "2 hours ago",
    avatar: "/avatar1.png",
  },
  {
    user: "Jane Smith",
    action: "added a new product",
    time: "5 hours ago",
    avatar: "/avatar2.png",
  },
  {
    user: "Robert Johnson",
    action: "closed a support ticket",
    time: "Yesterday",
    avatar: "/avatar3.png",
  },
  {
    user: "Lisa Wang",
    action: "completed onboarding",
    time: "2 days ago",
    avatar: "/avatar4.png",
  },
];

const chartData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
  { month: "Jul", revenue: 4300 },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen
              ? "opacity-100 ease-out duration-300"
              : "opacity-0 ease-in duration-200"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white transition transform ${
            sidebarOpen
              ? "translate-x-0 ease-out duration-300"
              : "-translate-x-full ease-in duration-200"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <XIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <span className="text-xl font-bold text-gray-800">MyDashboard</span>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              <NavItem
                href="/"
                icon={<HomeIcon className="mr-3 h-6 w-6" />}
                current
              >
                Dashboard
              </NavItem>
              <NavItem
                href="/analytics"
                icon={<ChartBarIcon className="mr-3 h-6 w-6" />}
              >
                Analytics
              </NavItem>
              <NavItem
                href="/customers"
                icon={<UsersIcon className="mr-3 h-6 w-6" />}
              >
                Customers
              </NavItem>
              <NavItem
                href="/messages"
                icon={<InboxIcon className="mr-3 h-6 w-6" />}
              >
                Messages
              </NavItem>
              <NavItem
                href="/settings"
                icon={<CogIcon className="mr-3 h-6 w-6" />}
              >
                Settings
              </NavItem>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-gray-800">
                MyDashboard
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <NavItem
                href="/"
                icon={<HomeIcon className="mr-3 h-6 w-6" />}
                current
              >
                Dashboard
              </NavItem>
              <NavItem
                href="/analytics"
                icon={<ChartBarIcon className="mr-3 h-6 w-6" />}
              >
                Analytics
              </NavItem>
              <NavItem
                href="/customers"
                icon={<UsersIcon className="mr-3 h-6 w-6" />}
              >
                Customers
              </NavItem>
              <NavItem
                href="/messages"
                icon={<InboxIcon className="mr-3 h-6 w-6" />}
              >
                Messages
              </NavItem>
              <NavItem
                href="/settings"
                icon={<CogIcon className="mr-3 h-6 w-6" />}
              >
                Settings
              </NavItem>
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h1 className="self-center text-xl font-semibold text-gray-800">
                Dashboard
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="View notifications"
              >
                <BellIcon className="h-6 w-6" />
              </button>

              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="User profile"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      AD
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                  <StatCard
                    key={item.name}
                    name={item.name}
                    value={item.value}
                    change={item.change}
                    increasing={item.increasing}
                  />
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Revenue Overview
                    </h3>
                    <div className="mt-2 h-64 relative">
                      <Chart data={chartData} />
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Recent Activity
                    </h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                      {recentActivity.map((item, index) => (
                        <ActivityItem
                          key={index}
                          user={item.user}
                          action={item.action}
                          time={item.time}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, children, current = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        current
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}

function StatCard({ name, value, change, increasing }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <ChartBarIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
              <div
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  increasing ? "text-green-600" : "text-red-600"
                }`}
              >
                {increasing ? (
                  <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                )}
                <span className="ml-1">{change}</span>
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ user, action, time }) {
  return (
    <li className="py-4 px-4 sm:px-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {user.charAt(0)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{user}</p>
          <p className="text-sm text-gray-500 truncate">{action}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </li>
  );
}

function Chart({ data }) {
  const maxRevenue = Math.max(...data.map((item) => item.revenue));
  const barWidth = 100 / data.length;

  return (
    <div className="w-full h-full flex items-end">
      {data.map((item, index) => {
        const height = (item.revenue / maxRevenue) * 100;
        return (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ width: `${barWidth}%` }}
          >
            <div
              className="w-3/4 bg-indigo-500 rounded-t"
              style={{ height: `${height}%` }}
            />
            <div className="mt-2 text-xs text-gray-500">{item.month}</div>
          </div>
        );
      })}
    </div>
  );
}
