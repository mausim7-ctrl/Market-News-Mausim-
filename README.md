# Market News Journal

Mobile-first, section-based Indian market pre-open journal.

Sections: Home, News, Market Effect, History, Learning.

## Deployment
Publish the repository with GitHub Pages from `main` and `/ (root)`.

## Automation
The included GitHub Actions workflow can update `data/reports.json` every morning.
Add a repository secret named `OPENAI_API_KEY` to enable the optional AI generation.
Without the secret, the app still works with its bundled report.
