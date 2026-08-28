import { ArrowLeft, BriefcaseBusiness, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  company: "",
  role: "",
  location: "",
  date: "",
  status: "Applied",
  jobUrl: "",
  notes: "",
};

function AddApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingApplications =
      JSON.parse(localStorage.getItem("jobtrack-applications")) || [];

    const newApplication = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "jobtrack-applications",
      JSON.stringify([
        newApplication,
        ...existingApplications,
      ])
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111827]">

      {/* Header */}

      <header className="border-b border-black/5 bg-white">

        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={18} />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
              J
            </div>

            <span className="hidden text-lg font-semibold tracking-tight sm:block">
              JobTrack
            </span>

          </div>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">

        {/* Heading */}

        <div className="mb-8">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <BriefcaseBusiness size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Add application
          </h1>

          <p className="mt-2 text-gray-500">
            Keep track of a new job opportunity.
          </p>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-8"
        >

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Company */}

            <div>

              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium"
              >
                Company name
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. TCS"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>


            {/* Job title */}

            <div>

              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium"
              >
                Job title
              </label>

              <input
                id="role"
                name="role"
                type="text"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Java Developer"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>


            {/* Location */}

            <div>

              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Pune"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>


            {/* Date */}

            <div>

              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium"
              >
                Application date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>


            {/* Status */}

            <div>

              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Technical Round">
                  Technical Round
                </option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

            </div>


            {/* Job URL */}

            <div>

              <label
                htmlFor="jobUrl"
                className="mb-2 block text-sm font-medium"
              >
                Job URL
              </label>

              <input
                id="jobUrl"
                name="jobUrl"
                type="url"
                value={form.jobUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

            </div>

          </div>


          {/* Notes */}

          <div className="mt-6">

            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add interview details, recruiter information, salary expectations, etc."
              rows="5"
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
            />

          </div>


          {/* Buttons */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-80"
            >
              <Save size={17} />
              Save application
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AddApplication;