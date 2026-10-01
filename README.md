## Generative UI Tool

### Tool: analyzeCivicReport

The application includes a server-side AI tool named `analyzeCivicReport`.

The AI can use this tool when a user describes a civic problem that needs structured analysis.

### Input Schema

The tool accepts:

| Field | Type | Allowed Values / Requirement |
|---|---|---|
| `category` | string | `waste`, `pothole`, `waterlogging`, `streetlight`, `other` |
| `description` | string | Minimum 5 characters |
| `location` | string | Minimum 2 characters |

Example input:

```json
{
  "category": "waterlogging",
  "description": "A road is heavily flooded after rain.",
  "location": "Agrabad, Chattogram"
}