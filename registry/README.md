# Project Registry

This directory is the shared memory of the studio. Every agent reads and writes here.

## Structure

```
registry/
├── README.md               ← this file
├── financial/              ← FINYON reports
│   └── finyon-report-*.json
└── {project_id}/           ← one folder per project
    ├── brief.json          ← Proxy-authored project brief
    ├── BRAND.md            ← brand/style guide for this project
    ├── narryon-output.json ← NARRYON deliverable
    ├── visuyon-output.json ← VISUYON deliverable
    ├── viryon-output.json  ← VIRYON deliverable
    └── codexyon-output.json← CODEXYON deliverable
```

## Brief Schema

```json
{
  "project_id": "p001",
  "name": "Project Name",
  "created": "ISO8601",
  "owner": "onem",
  "priority": "HIGH | MED | LOW",
  "status": "active | pending | blocked | done",
  "brief": "Full description of the project goal",
  "audience": "Target audience",
  "tone": "Brand tone for this project",
  "deadline": "ISO8601 or null",
  "agents_required": ["NARRYON", "VISUYON", "VIRYON", "CODEXYON"],
  "notes": "Any additional context"
}
```
