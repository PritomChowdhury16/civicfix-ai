async function getHealthData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")

  if (!response.ok) {
    throw new Error("Failed to fetch health data")
  }

  return response.json()
}

export default async function HealthPage() {
  const data = await getHealthData()

  return (
    <main>
      <h1>Health Check</h1>

      <p>API connection is working.</p>

      <div>
        <p>
          <strong>Fetched Data:</strong>
        </p>

        <p>Task: {data.title}</p>
        <p>Completed: {data.completed ? "Yes" : "No"}</p>
      </div>
    </main>
  )
}