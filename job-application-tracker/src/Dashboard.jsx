import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Plus,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const demoApplications = [
  {
    id: 1,
    company: "TCS",
    role: "Java Developer",
    location: "Pune",
    date: "Aug 27, 2026",
    status: "Interview",
  },
  {
    id: 2,
    company: "Infosys",
    role: "Full Stack Developer",
    location: "Bangalore",
    date: "Aug 25, 2026",
    status: "Applied",
  },
  {
    id: 3,
    company: "Accenture",
    role: "Software Engineer",
    location: "Mumbai",
    date: "Aug 22, 2026",
    status: "Technical Round",
  },
  {
    id: 4,
    company: "Wipro",
    role: "Frontend Developer",
    location: "Hyderabad",
    date: "Aug 20, 2026",
    status: "Rejected",
  },
];

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700",
  Interview: "bg-purple-50 text-purple-700",
  "Technical Round": "bg-orange-50 text-orange-700",
  Offer: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("jobtrack-applications")) || [];

    setApplications([
      ...savedApplications,
      ...demoApplications,
    ]);
  }, []);

  const applicationCount = applications.length;

  const interviewCount = applications.filter(
    (application) =>
      application.status === "Interview" ||
      application.status === "Technical Round"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111827]">

      {/* Header */}

      <header className="border-b border-black/5 bg-white">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
              J
            </div>

            <span className="text-lg font-semibold tracking-tight">
              JobTrack
            </span>

          </Link>


          <div className="flex items-center gap-3">

            <button className="hidden rounded-full px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:block">
              Help
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
              DK
            </div>

          </div>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Welcome */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <p className="mb-1 text-sm text-gray-500">
              Friday, August 28, 2026
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              Good afternoon 👋
            </h1>

            <p className="mt-2 text-gray-500">
              Here's what's happening with your job search.
            </p>

          </div>


          <Link
            to="/add-application"
            className="flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-80"
          >
            <Plus size={17} />
            Add application
          </Link>

        </div>


        {/* Statistics */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<BriefcaseBusiness size={20} />}
            label="Applications"
            value={applicationCount}
            change="Total tracked applications"
          />

          <StatCard
            icon={<CalendarDays size={20} />}
            label="Interviews"
            value={interviewCount}
            change="Active interview stages"
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Offers"
            value={offerCount}
            change="Offers received"
          />

          <StatCard
            icon={<TrendingUp size={20} />}
            label="Response rate"
            value={applicationCount ? "33%" : "0%"}
            change="Based on tracked activity"
          />

        </div>


        {/* Content */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Applications */}

          <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Recent applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest job applications
                </p>

              </div>


              <Link
                to="/add-application"
                className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-black"
              >
                Add new
                <ChevronRight size={16} />
              </Link>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left">

                <thead>

                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">

                    <th className="pb-3 font-medium">
                      Company
                    </th>

                    <th className="pb-3 font-medium">
                      Position
                    </th>

                    <th className="pb-3 font-medium">
                      Location
                    </th>

                    <th className="pb-3 font-medium">
                      Status
                    </th>

                    <th className="pb-3 font-medium">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {applications.slice(0, 6).map((application) => (

                    <tr
                      key={application.id}
                      className="border-b border-gray-50 last:border-0"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold">
                            {application.company?.charAt(0)}
                          </div>

                          <span className="font-medium">
                            {application.company}
                          </span>

                        </div>

                      </td>


                      <td className="py-4 text-sm">
                        {application.role}
                      </td>


                      <td className="py-4 text-sm text-gray-500">
                        {application.location || "—"}
                      </td>


                      <td className="py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[application.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {application.status}
                        </span>

                      </td>


                      <td className="py-4 text-sm text-gray-500">
                        {application.date}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* Right column */}

          <div className="space-y-6">

            {/* Next interview */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="font-semibold">
                    Next interview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Coming up next
                  </p>

                </div>

                <CalendarDays
                  size={18}
                  className="text-gray-400"
                />

              </div>


              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
                    T
                  </div>

                  <div>

                    <p className="font-medium">
                      TCS
                    </p>

                    <p className="text-sm text-gray-500">
                      Java Developer
                    </p>

                  </div>

                </div>


                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">

                  <Clock3 size={16} />

                  Tomorrow • 10:00 AM

                </div>

              </div>

            </section>


            {/* Progress */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">

              <h2 className="font-semibold">
                Application progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your current pipeline
              </p>


              <div className="mt-5 space-y-4">

                <Progress
                  label="Applied"
                  value={
                    applications.filter(
                      (item) => item.status === "Applied"
                    ).length
                  }
                  percentage="100%"
                />

                <Progress
                  label="Interviews"
                  value={interviewCount}
                  percentage={
                    applicationCount
                      ? `${Math.min(
                          100,
                          (interviewCount / applicationCount) * 100
                        )}%`
                      : "0%"
                  }
                />

                <Progress
                  label="Offers"
                  value={offerCount}
                  percentage={
                    applicationCount
                      ? `${Math.min(
                          100,
                          (offerCount / applicationCount) * 100
                        )}%`
                      : "0%"
                  }
                />

              </div>

            </section>

          </div>

        </div>


        {/* Quick Actions */}

        <section className="mt-6">

          <h2 className="mb-4 font-semibold">
            Quick actions
          </h2>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/add-application"
              className="group rounded-2xl border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition group-hover:bg-black group-hover:text-white">
                <Plus size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                Add application
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Track a new job
              </p>

            </Link>


            <QuickAction
              icon={<CalendarDays size={19} />}
              title="Schedule interview"
              description="Keep interviews organized"
            />

            <QuickAction
              icon={<FileText size={19} />}
              title="Update resume"
              description="Keep your resume ready"
            />

            <QuickAction
              icon={<Settings size={19} />}
              title="Preferences"
              description="Customize JobTrack"
            />

          </div>

        </section>

      </main>

    </div>
  );
}


/* Stat Card */

function StatCard({
  icon,
  label,
  value,
  change,
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>

        <TrendingUp
          size={16}
          className="text-gray-400"
        />

      </div>


      <p className="mt-5 text-sm text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-3xl font-semibold tracking-tight">
        {value}
      </p>


      <p className="mt-2 text-xs text-gray-500">
        {change}
      </p>

    </div>
  );
}


/* Progress */

function Progress({
  label,
  value,
  percentage,
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between text-sm">

        <span>
          {label}
        </span>

        <span className="text-gray-500">
          {value}
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-gray-100">

        <div
          className="h-full rounded-full bg-black"
          style={{
            width: percentage,
          }}
        />

      </div>

    </div>
  );
}


/* Quick Action */

function QuickAction({
  icon,
  title,
  description,
}) {
  return (
    <button className="group rounded-2xl border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition group-hover:bg-black group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </button>
  );
}

export default Dashboard;