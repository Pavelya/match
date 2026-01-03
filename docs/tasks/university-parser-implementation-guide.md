# University Program Parser - Complete Implementation Guide

> **How to Use This Document**: This is a self-contained implementation guide. Each task includes ALL information needed to implement it - goals, files to create, exact code, and acceptance criteria. Start at TASK-001 and work through sequentially.

---

## Quick Reference

| Item | Value |
|------|-------|
| **Repository Name** | `university-parser` (separate from IB Match) |
| **Language** | Python 3.12+ |
| **Framework** | FastAPI + Jinja2 + HTMX |
| **Database** | SQLite + SQLAlchemy 2.0 |
| **AI Service** | Google Gemini 1.5 Pro |
| **Scraping** | Playwright (async) |
| **IB Match API URL** | Configurable via `IB_MATCH_API_URL` env var |

---

## TASK-001: Create Repository and Project Structure

### Goal
Create the Python project with all directories and configuration files.

### Files to Create

#### 1. `pyproject.toml`
```toml
[project]
name = "university-parser"
version = "0.1.0"
description = "Parser for extracting university programs for IB Match"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.32.0",
    "jinja2>=3.1.0",
    "python-multipart>=0.0.9",
    "sqlalchemy>=2.0.0",
    "aiosqlite>=0.20.0",
    "httpx>=0.26.0",
    "playwright>=1.40.0",
    "google-generativeai>=0.3.0",
    "pydantic>=2.5.0",
    "pydantic-settings>=2.0.0",
    "pymupdf>=1.23.0",
    "pyyaml>=6.0.0",
    "beautifulsoup4>=4.12.0",
    "python-dotenv>=1.0.0",
]

[project.optional-dependencies]
dev = ["pytest>=7.4.0", "pytest-asyncio>=0.23.0", "ruff>=0.1.0"]
```

#### 2. `.env.example`
```bash
# IB Match Integration
IB_MATCH_API_URL=http://localhost:3000
IB_MATCH_ADMIN_TOKEN=your-admin-jwt-token
REFERENCE_API_KEY=same-key-as-IB-Match-REFERENCE_API_KEY

# Google Gemini
GOOGLE_API_KEY=your-gemini-api-key

# Application
APP_SECRET_KEY=your-secret-key-min-32-chars
DATABASE_URL=sqlite:///./data/parser.db
```

#### 3. `.gitignore`
```
__pycache__/
*.py[cod]
.env
data/
*.db
.venv/
```

#### 4. Directory Structure (create empty `__init__.py` files)
```
university-parser/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   └── __init__.py
│   ├── schemas/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   ├── routers/
│   │   └── __init__.py
│   └── templates/
├── configs/
├── data/
└── tests/
    └── __init__.py
```

### Acceptance Criteria
- [ ] Running `pip install -e .` installs all dependencies
- [ ] Directory structure exists with all `__init__.py` files
- [ ] `.env.example` shows all required environment variables

---

## TASK-002: Create FastAPI Application and Database Setup

### Goal
Create the FastAPI app entry point, configuration, and SQLAlchemy database setup.

### Files to Create

#### 1. `app/config.py`
```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # IB Match
    ib_match_api_url: str = "http://localhost:3000"
    ib_match_admin_token: str = ""
    reference_api_key: str = ""  # API key for /api/reference/* endpoints
    
    # Gemini
    google_api_key: str = ""
    
    # App
    app_secret_key: str = "change-me-in-production"
    database_url: str = "sqlite:///./data/parser.db"
    
    # Scraping
    default_rate_limit: float = 2.0
    playwright_headless: bool = True
    
    class Config:
        env_file = ".env"

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
```

#### 2. `app/database.py`
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

# Convert sqlite:// to sqlite+aiosqlite://
db_url = settings.database_url.replace("sqlite://", "sqlite+aiosqlite://")
engine = create_async_engine(db_url, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with async_session() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
```

#### 3. `app/main.py`
```python
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from contextlib import asynccontextmanager
from pathlib import Path

from app.database import init_db
from app.routers import dashboard, universities, jobs, programs, sync

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create database tables
    Path("data").mkdir(exist_ok=True)
    await init_db()
    yield
    # Shutdown: cleanup

app = FastAPI(title="University Parser", lifespan=lifespan)

# Templates
templates = Jinja2Templates(directory="app/templates")

# Routers
app.include_router(dashboard.router)
app.include_router(universities.router, prefix="/universities")
app.include_router(jobs.router, prefix="/jobs")
app.include_router(programs.router, prefix="/programs")
app.include_router(sync.router, prefix="/sync")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})
```

#### 4. `app/templates/base.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}University Parser{% endblock %}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <nav class="bg-white shadow mb-6">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="text-xl font-bold text-gray-800">University Parser</a>
                <div class="flex gap-4">
                    <a href="/universities" class="text-gray-600 hover:text-gray-900">Universities</a>
                    <a href="/jobs" class="text-gray-600 hover:text-gray-900">Jobs</a>
                    <a href="/programs" class="text-gray-600 hover:text-gray-900">Programs</a>
                </div>
            </div>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4">
        {% block content %}{% endblock %}
    </main>
</body>
</html>
```

#### 5. `app/templates/dashboard.html`
```html
{% extends "base.html" %}
{% block content %}
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Reference Data Sync Card -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Reference Data</h2>
        <div id="sync-status" hx-get="/sync/status" hx-trigger="load">
            Loading...
        </div>
        <button 
            hx-post="/sync/run" 
            hx-target="#sync-status"
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sync Now
        </button>
    </div>
    
    <!-- Universities Card -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Universities</h2>
        <p class="text-3xl font-bold" id="uni-count">-</p>
        <a href="/universities" class="text-blue-600 hover:underline">Manage →</a>
    </div>
    
    <!-- Recent Jobs Card -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Recent Jobs</h2>
        <div id="recent-jobs" hx-get="/jobs/recent" hx-trigger="load">
            Loading...
        </div>
    </div>
</div>
{% endblock %}
```

#### 6. Create empty router files
Create these files with minimal content:

`app/routers/__init__.py`: empty
`app/routers/dashboard.py`:
```python
from fastapi import APIRouter
router = APIRouter()
```

`app/routers/universities.py`, `app/routers/jobs.py`, `app/routers/programs.py`, `app/routers/sync.py`: same pattern

### Acceptance Criteria
- [ ] Running `uvicorn app.main:app --reload` starts the server
- [ ] Visiting `http://localhost:8000` shows the dashboard
- [ ] Database file `data/parser.db` is created automatically

---

## TASK-003: Create SQLAlchemy Models

### Goal
Define all database models for universities, jobs, pages, programs, and reference data cache.

### File to Create: `app/models/models.py`

```python
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class UniversityConfig(Base):
    __tablename__ = "university_configs"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False, unique=True)
    base_url = Column(String, nullable=False)
    program_list_urls = Column(Text, nullable=False)  # JSON array
    program_link_selector = Column(String, nullable=False, default="a")
    requires_js = Column(Boolean, default=True)
    rate_limit_seconds = Column(Float, default=2.0)
    is_active = Column(Boolean, default=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class ScrapeJob(Base):
    __tablename__ = "scrape_jobs"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    university_config_id = Column(String, ForeignKey("university_configs.id"))
    status = Column(String, default="pending")  # pending, running, completed, failed
    total_pages = Column(Integer, default=0)
    scraped_pages = Column(Integer, default=0)
    extracted_count = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())


class ScrapedPage(Base):
    __tablename__ = "scraped_pages"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    job_id = Column(String, ForeignKey("scrape_jobs.id"))
    url = Column(String, nullable=False)
    title = Column(String, nullable=True)
    html_path = Column(String, nullable=True)  # Path to saved HTML file
    pdf_urls = Column(Text, nullable=True)  # JSON array
    status = Column(String, default="scraped")  # scraped, extracted, failed
    error_message = Column(Text, nullable=True)
    scraped_at = Column(DateTime, server_default=func.now())


class ExtractedProgram(Base):
    __tablename__ = "extracted_programs"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    scraped_page_id = Column(String, ForeignKey("scraped_pages.id"))
    job_id = Column(String, ForeignKey("scrape_jobs.id"))
    
    # Extracted data
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    degree_type = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    min_ib_points = Column(Integer, nullable=True)
    program_url = Column(String, nullable=True)
    
    # Normalized data (after validation)
    field_of_study_id = Column(String, nullable=True)
    field_of_study_name = Column(String, nullable=True)
    course_requirements_json = Column(Text, nullable=True)  # JSON array
    
    # AI metadata
    extraction_confidence = Column(Float, default=0.8)
    ib_requirements_found = Column(Boolean, default=False)
    
    # Validation status
    validation_status = Column(String, default="pending")  # pending, valid, invalid
    validation_errors = Column(Text, nullable=True)  # JSON array
    
    # Import tracking
    import_status = Column(String, default="pending")  # pending, imported, skipped
    imported_at = Column(DateTime, nullable=True)
    ib_match_program_id = Column(String, nullable=True)
    
    created_at = Column(DateTime, server_default=func.now())


class IBCourseCache(Base):
    __tablename__ = "ib_courses_cache"
    
    id = Column(String, primary_key=True)
    code = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    group_number = Column(Integer, nullable=False)
    synced_at = Column(DateTime, server_default=func.now())


class FieldOfStudyCache(Base):
    __tablename__ = "fields_of_study_cache"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    icon_name = Column(String, nullable=True)
    synced_at = Column(DateTime, server_default=func.now())


class SyncStatus(Base):
    __tablename__ = "sync_status"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    last_sync_at = Column(DateTime, nullable=True)
    courses_count = Column(Integer, default=0)
    fields_count = Column(Integer, default=0)
    ib_match_url = Column(String, nullable=True)
```

### Update `app/models/__init__.py`
```python
from app.models.models import (
    UniversityConfig,
    ScrapeJob,
    ScrapedPage,
    ExtractedProgram,
    IBCourseCache,
    FieldOfStudyCache,
    SyncStatus,
)
```

### Update `app/database.py` to import models
Add at the end:
```python
# Import models so they're registered with Base
from app.models import models  # noqa: F401
```

### Acceptance Criteria
- [ ] Starting the app creates all tables in SQLite
- [ ] Can verify with: `sqlite3 data/parser.db ".tables"`

---

## TASK-003a: Create Reference Data API Endpoints in IB Match

> ⚠️ **THIS TASK IS FOR THE IB MATCH CODEBASE** (`/Users/pavel/match`), NOT the parser

### Goal
Create **API key secured** endpoints in IB Match that expose IB courses and fields of study for the parser to sync.

### Security Approach
- Endpoints require `X-API-Key` header matching `REFERENCE_API_KEY` env var
- Parser stores this key in its `.env` and sends with each request
- In development mode, requests work without API key for easier testing

### Environment Variable to Add (IB Match `.env`)
```bash
REFERENCE_API_KEY=generate-a-secure-random-key-here
```

### Why This Is Needed
When an admin adds new IB courses or fields of study in IB Match, the parser needs to fetch the updated list securely.

### Files to Create (in IB Match)

#### 1. `app/api/reference/ib-courses/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isValidApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('X-API-Key')
  const validKey = process.env.REFERENCE_API_KEY
  // Allow in dev if no key configured
  if (process.env.NODE_ENV === 'development' && !validKey) return true
  return apiKey === validKey
}

export async function GET(request: NextRequest) {
  if (!isValidApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const courses = await prisma.iBCourse.findMany({
      select: { id: true, code: true, name: true, group: true },
      orderBy: { group: 'asc' }
    })
    return NextResponse.json({ courses, count: courses.length })
  } catch (error) {
    console.error('Error fetching IB courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}
```

#### 2. `app/api/reference/fields-of-study/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isValidApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('X-API-Key')
  const validKey = process.env.REFERENCE_API_KEY
  if (process.env.NODE_ENV === 'development' && !validKey) return true
  return apiKey === validKey
}

export async function GET(request: NextRequest) {
  if (!isValidApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const fields = await prisma.fieldOfStudy.findMany({
      select: { id: true, name: true, iconName: true },
      orderBy: { name: 'asc' }
    })
    return NextResponse.json({ fields, count: fields.length })
  } catch (error) {
    console.error('Error fetching fields:', error)
    return NextResponse.json({ error: 'Failed to fetch fields' }, { status: 500 })
  }
}
```

### Testing
```bash
cd /Users/pavel/match
npm run dev

# Without API key (works in dev, fails in prod)
curl http://localhost:3000/api/reference/ib-courses

# With API key (always works)
curl -H "X-API-Key: your-key-here" http://localhost:3000/api/reference/ib-courses
```

### Acceptance Criteria
- [ ] `GET /api/reference/ib-courses` returns 401 without valid API key (in production)
- [ ] `GET /api/reference/fields-of-study` returns 401 without valid API key (in production)
- [ ] Both endpoints return data when valid `X-API-Key` header is provided
- [ ] In development mode, requests work without API key

---

## TASK-004: Create Reference Data Sync Service (Parser)

> ⚠️ **Prerequisite: Complete TASK-003a first** (IB Match API endpoints)

### Goal
Implement the service that fetches IB courses and fields of study from IB Match API and caches them locally.

### Prerequisites
**IB Match must have these endpoints (create in IB Match first):**

1. `GET /api/reference/ib-courses` - returns `{ courses: [...], count: N }`
2. `GET /api/reference/fields-of-study` - returns `{ fields: [...], count: N }`

### Files to Create

#### 1. `app/services/reference_sync.py`
```python
import httpx
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.config import settings
from app.models import IBCourseCache, FieldOfStudyCache, SyncStatus


class ReferenceSyncService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.base_url = settings.ib_match_api_url
    
    async def sync_all(self) -> dict:
        """Fetch all reference data from IB Match and update local cache."""
        headers = {}
        if settings.reference_api_key:
            headers["X-API-Key"] = settings.reference_api_key
        
        async with httpx.AsyncClient(timeout=30.0, headers=headers) as client:
            # Fetch courses
            courses_resp = await client.get(f"{self.base_url}/api/reference/ib-courses")
            courses_resp.raise_for_status()
            courses_data = courses_resp.json()
            
            # Fetch fields
            fields_resp = await client.get(f"{self.base_url}/api/reference/fields-of-study")
            fields_resp.raise_for_status()
            fields_data = fields_resp.json()
        
        # Clear existing cache
        await self.db.execute(delete(IBCourseCache))
        await self.db.execute(delete(FieldOfStudyCache))
        
        # Insert courses
        for course in courses_data.get("courses", []):
            self.db.add(IBCourseCache(
                id=course["id"],
                code=course["code"],
                name=course["name"],
                group_number=course["group"],
                synced_at=datetime.utcnow()
            ))
        
        # Insert fields
        for field in fields_data.get("fields", []):
            self.db.add(FieldOfStudyCache(
                id=field["id"],
                name=field["name"],
                icon_name=field.get("iconName"),
                synced_at=datetime.utcnow()
            ))
        
        # Update sync status
        status = await self.db.execute(select(SyncStatus).limit(1))
        sync_status = status.scalar_one_or_none()
        
        if sync_status:
            sync_status.last_sync_at = datetime.utcnow()
            sync_status.courses_count = len(courses_data.get("courses", []))
            sync_status.fields_count = len(fields_data.get("fields", []))
            sync_status.ib_match_url = self.base_url
        else:
            self.db.add(SyncStatus(
                last_sync_at=datetime.utcnow(),
                courses_count=len(courses_data.get("courses", [])),
                fields_count=len(fields_data.get("fields", [])),
                ib_match_url=self.base_url
            ))
        
        await self.db.commit()
        
        return {
            "success": True,
            "courses_synced": len(courses_data.get("courses", [])),
            "fields_synced": len(fields_data.get("fields", [])),
            "synced_at": datetime.utcnow().isoformat()
        }
    
    async def get_status(self) -> dict:
        """Get current sync status."""
        result = await self.db.execute(select(SyncStatus).limit(1))
        status = result.scalar_one_or_none()
        
        if not status:
            return {
                "synced": False,
                "last_sync_at": None,
                "courses_count": 0,
                "fields_count": 0
            }
        
        return {
            "synced": True,
            "last_sync_at": status.last_sync_at.isoformat() if status.last_sync_at else None,
            "courses_count": status.courses_count,
            "fields_count": status.fields_count,
            "ib_match_url": status.ib_match_url
        }
    
    async def get_courses_map(self) -> dict[str, str]:
        """Get mapping of course code → course ID."""
        result = await self.db.execute(select(IBCourseCache))
        courses = result.scalars().all()
        return {c.code: c.id for c in courses}
    
    async def get_fields_map(self) -> dict[str, str]:
        """Get mapping of field name (lowercase) → field ID."""
        result = await self.db.execute(select(FieldOfStudyCache))
        fields = result.scalars().all()
        return {f.name.lower(): f.id for f in fields}
```

#### 2. `app/routers/sync.py`
```python
from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services.reference_sync import ReferenceSyncService

router = APIRouter(tags=["sync"])


@router.get("/status")
async def get_sync_status(db: AsyncSession = Depends(get_db)):
    service = ReferenceSyncService(db)
    status = await service.get_status()
    
    # Return HTML fragment for HTMX
    if status["synced"]:
        return HTMLResponse(f"""
            <div class="text-sm text-gray-600">
                <p>Last sync: {status['last_sync_at']}</p>
                <p>Courses: {status['courses_count']}</p>
                <p>Fields: {status['fields_count']}</p>
            </div>
        """)
    else:
        return HTMLResponse("""
            <div class="text-sm text-yellow-600">
                Not synced yet. Click "Sync Now" to fetch reference data.
            </div>
        """)


@router.post("/run")
async def run_sync(db: AsyncSession = Depends(get_db)):
    service = ReferenceSyncService(db)
    try:
        result = await service.sync_all()
        return HTMLResponse(f"""
            <div class="text-sm text-green-600">
                ✓ Synced {result['courses_synced']} courses and {result['fields_synced']} fields
            </div>
        """)
    except Exception as e:
        return HTMLResponse(f"""
            <div class="text-sm text-red-600">
                ✗ Sync failed: {str(e)}
            </div>
        """)
```

### Acceptance Criteria
- [ ] Parser "Sync Now" button fetches data from IB Match (endpoints from TASK-003a)
- [ ] After sync, dashboard shows course/field counts
- [ ] Courses and fields are cached in SQLite

---

## TASK-005: Create Playwright Scraper Service

### Goal
Implement async Playwright-based web scraper for collecting program pages.

### File to Create: `app/services/scraper.py`

```python
from playwright.async_api import async_playwright, Browser, Page
from bs4 import BeautifulSoup
import asyncio
from pathlib import Path
from datetime import datetime
import json
import uuid


class ScraperResult:
    def __init__(self, url: str, title: str, html: str, pdf_urls: list[str], error: str = None):
        self.url = url
        self.title = title
        self.html = html
        self.pdf_urls = pdf_urls
        self.error = error
        self.success = error is None


class PlaywrightScraper:
    def __init__(self, rate_limit: float = 2.0, headless: bool = True):
        self.rate_limit = rate_limit
        self.headless = headless
        self._browser: Browser | None = None
        self._playwright = None
    
    async def start(self):
        self._playwright = await async_playwright().start()
        self._browser = await self._playwright.chromium.launch(headless=self.headless)
    
    async def stop(self):
        if self._browser:
            await self._browser.close()
        if self._playwright:
            await self._playwright.stop()
    
    async def scrape_page(self, url: str) -> ScraperResult:
        """Scrape a single page."""
        if not self._browser:
            await self.start()
        
        page = await self._browser.new_page()
        try:
            await page.goto(url, wait_until="networkidle", timeout=30000)
            
            title = await page.title()
            html = await page.content()
            
            # Find PDF links
            pdf_links = await page.eval_on_selector_all(
                'a[href$=".pdf"], a[href*="/pdf/"]',
                "els => els.map(e => e.href)"
            )
            
            return ScraperResult(url, title, html, list(set(pdf_links)))
            
        except Exception as e:
            return ScraperResult(url, "", "", [], error=str(e))
        finally:
            await page.close()
    
    async def find_program_links(self, url: str, selector: str) -> list[str]:
        """Find all program links on a listing page."""
        if not self._browser:
            await self.start()
        
        page = await self._browser.new_page()
        try:
            await page.goto(url, wait_until="networkidle", timeout=30000)
            
            links = await page.eval_on_selector_all(
                selector,
                "els => els.map(e => e.href).filter(h => h && h.startsWith('http'))"
            )
            return list(set(links))
            
        finally:
            await page.close()
    
    async def scrape_university(
        self,
        list_urls: list[str],
        link_selector: str,
        output_dir: Path,
        on_progress: callable = None
    ) -> list[ScraperResult]:
        """
        Scrape all programs from a university.
        
        Args:
            list_urls: URLs of program listing pages
            link_selector: CSS selector for program links
            output_dir: Directory to save HTML files
            on_progress: Callback(current, total, url) for progress updates
        """
        await self.start()
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Find all program links
        all_links = []
        for list_url in list_urls:
            links = await self.find_program_links(list_url, link_selector)
            all_links.extend(links)
            await asyncio.sleep(self.rate_limit)
        
        all_links = list(set(all_links))  # Deduplicate
        total = len(all_links)
        
        results = []
        for i, url in enumerate(all_links):
            if on_progress:
                on_progress(i + 1, total, url)
            
            result = await self.scrape_page(url)
            
            # Save HTML to file
            if result.success:
                file_id = str(uuid.uuid4())[:8]
                html_path = output_dir / f"page_{file_id}.html"
                html_path.write_text(result.html, encoding="utf-8")
                result.html_path = str(html_path)
            
            results.append(result)
            await asyncio.sleep(self.rate_limit)
        
        await self.stop()
        return results
```

### Run Command for First-Time Setup
```bash
playwright install chromium
```

### Acceptance Criteria
- [ ] Can scrape a single URL and get HTML content
- [ ] Can find links on a listing page using CSS selector
- [ ] Saves HTML files to output directory
- [ ] Respects rate limiting between requests

---

## TASK-006: Create Gemini Extractor Service

### Goal
Implement AI-powered extraction using Google Gemini to parse program data from HTML.

### File to Create: `app/services/extractor.py`

```python
import google.generativeai as genai
import json
from pydantic import BaseModel
from app.config import settings


class CourseRequirement(BaseModel):
    course_name: str
    level: str  # "HL" or "SL"
    min_grade: int
    is_critical: bool = False
    alternatives: list["CourseRequirement"] = []


class ExtractedData(BaseModel):
    name: str
    description: str
    degree_type: str
    duration: str
    min_ib_points: int | None = None
    program_url: str | None = None
    course_requirements: list[CourseRequirement] = []
    ib_requirements_found: bool = True
    extraction_confidence: float = 0.8


CourseRequirement.model_rebuild()  # For forward reference


EXTRACTION_PROMPT = '''You are extracting university program data for an IB matching platform.

Extract from the HTML below and return ONLY valid JSON (no markdown, no explanation):

{
  "name": "Program name",
  "description": "Full description (2-3 paragraphs)",
  "degree_type": "Bachelor|Master|PhD|Diploma|Certificate",
  "duration": "e.g., 3 years",
  "min_ib_points": 36,
  "ib_requirements_found": true,
  "extraction_confidence": 0.9,
  "course_requirements": [
    {
      "course_name": "Mathematics: Analysis and Approaches",
      "level": "HL",
      "min_grade": 6,
      "is_critical": true,
      "alternatives": []
    }
  ]
}

IB Course names to use:
- Mathematics: Analysis and Approaches
- Mathematics: Applications and Interpretation
- Physics, Chemistry, Biology, Computer Science
- Economics, Business Management, Psychology, History
- English A: Literature, English A: Language & Literature

Rules:
1. Extract IB point requirements (usually 24-45)
2. For "one of X, Y, or Z at HL", use alternatives array
3. Set ib_requirements_found: false if no IB info found
4. Return valid JSON only

HTML Content:
{html_content}
'''


class GeminiExtractor:
    def __init__(self):
        genai.configure(api_key=settings.google_api_key)
        self.model = genai.GenerativeModel("gemini-1.5-pro")
    
    async def extract(self, html_content: str, source_url: str = None) -> ExtractedData | None:
        """Extract program data from HTML using Gemini."""
        # Truncate HTML to avoid token limits
        max_chars = 100000
        if len(html_content) > max_chars:
            html_content = html_content[:max_chars]
        
        prompt = EXTRACTION_PROMPT.replace("{html_content}", html_content)
        
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                )
            )
            
            data = json.loads(response.text)
            
            # Add source URL if provided
            if source_url and not data.get("program_url"):
                data["program_url"] = source_url
            
            return ExtractedData(**data)
            
        except json.JSONDecodeError as e:
            print(f"JSON parse error: {e}")
            return None
        except Exception as e:
            print(f"Extraction error: {e}")
            return None
```

### Acceptance Criteria
- [ ] Can extract program name, description, degree type from HTML
- [ ] Can extract IB point requirements when present
- [ ] Returns None on failure instead of crashing
- [ ] Handles large HTML by truncating

---

## TASK-007: Create Validator Service

### Goal
Validate extracted data against cached reference data and normalize course names.

### File to Create: `app/services/validator.py`

```python
from dataclasses import dataclass
from app.services.extractor import ExtractedData, CourseRequirement


# Course name variations → canonical IB Match code
COURSE_NAME_MAP = {
    "mathematics analysis and approaches": "MATH-AA",
    "mathematics: analysis and approaches": "MATH-AA",
    "math aa": "MATH-AA",
    "mathematics applications and interpretation": "MATH-AI",
    "mathematics: applications and interpretation": "MATH-AI",
    "math ai": "MATH-AI",
    "physics": "PHYS",
    "chemistry": "CHEM",
    "biology": "BIO",
    "computer science": "CS",
    "economics": "ECON",
    "business management": "BUS-MGMT",
    "business and management": "BUS-MGMT",
    "psychology": "PSYCH",
    "history": "HIST",
    "english a literature": "ENG-LIT",
    "english a: literature": "ENG-LIT",
    "english a language and literature": "ENG-LL",
    "english a: language & literature": "ENG-LL",
    "spanish b": "SPA-B",
    "french b": "FRA-B",
    "visual arts": "VISUAL-ARTS",
    "music": "MUSIC",
}

# Field of study inference keywords
FIELD_KEYWORDS = {
    "computer science": ["computer", "software", "programming", "data science", "ai", "computing"],
    "engineering": ["engineering", "mechanical", "electrical", "civil", "aerospace"],
    "business & economics": ["business", "economics", "finance", "accounting", "management", "mba"],
    "medicine & health": ["medicine", "medical", "nursing", "pharmacy", "health", "dentistry"],
    "law": ["law", "legal", "jurisprudence"],
    "natural sciences": ["physics", "chemistry", "biology", "mathematics", "science"],
    "arts & humanities": ["arts", "humanities", "literature", "history", "philosophy", "language"],
    "social sciences": ["psychology", "sociology", "political", "international relations"],
}


@dataclass
class ValidationResult:
    is_valid: bool
    errors: list[str]
    normalized_data: dict | None


class ProgramValidator:
    def __init__(self, courses_map: dict[str, str], fields_map: dict[str, str]):
        """
        Args:
            courses_map: code → id mapping from cache
            fields_map: name.lower() → id mapping from cache
        """
        self.courses_map = courses_map
        self.fields_map = fields_map
    
    def normalize_course_name(self, name: str) -> str | None:
        """Map extracted course name to canonical code."""
        normalized = name.lower().strip()
        normalized = normalized.replace(" hl", "").replace(" sl", "").strip()
        return COURSE_NAME_MAP.get(normalized)
    
    def infer_field_of_study(self, name: str, description: str) -> str | None:
        """Infer field of study from program name and description."""
        text = f"{name} {description}".lower()
        
        for field_name, keywords in FIELD_KEYWORDS.items():
            if any(kw in text for kw in keywords):
                return self.fields_map.get(field_name)
        
        return None
    
    def validate(self, data: ExtractedData) -> ValidationResult:
        """Validate extracted program data."""
        errors = []
        normalized = {}
        
        # Required fields
        if not data.name:
            errors.append("Missing program name")
        if not data.description:
            errors.append("Missing description")
        if not data.degree_type:
            errors.append("Missing degree type")
        if not data.duration:
            errors.append("Missing duration")
        
        # IB points range
        if data.min_ib_points is not None:
            if data.min_ib_points < 24 or data.min_ib_points > 45:
                errors.append(f"IB points {data.min_ib_points} out of range (24-45)")
        
        # Normalize course requirements
        normalized_reqs = []
        for req in data.course_requirements:
            code = self.normalize_course_name(req.course_name)
            if code:
                course_id = self.courses_map.get(code)
                if course_id:
                    normalized_reqs.append({
                        "ibCourseId": course_id,
                        "requiredLevel": req.level,
                        "minGrade": req.min_grade,
                        "isCritical": req.is_critical,
                        "orGroupId": None  # TODO: handle alternatives
                    })
                else:
                    errors.append(f"Course code {code} not in cache")
            else:
                errors.append(f"Unknown course: {req.course_name}")
        
        # Infer field of study
        field_id = self.infer_field_of_study(data.name, data.description)
        if not field_id:
            errors.append("Could not infer field of study")
        
        if not errors:
            normalized = {
                "name": data.name,
                "description": data.description,
                "degreeType": data.degree_type,
                "duration": data.duration,
                "minIBPoints": data.min_ib_points,
                "programUrl": data.program_url,
                "fieldOfStudyId": field_id,
                "courseRequirements": normalized_reqs,
            }
        
        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            normalized_data=normalized if not errors else None
        )
```

### Acceptance Criteria
- [ ] Maps course name variations to canonical codes
- [ ] Validates IB points are in 24-45 range
- [ ] Infers field of study from keywords
- [ ] Returns detailed error list for invalid data

---

## TASK-008: Create IB Match Importer Service

### Goal
Send validated programs to IB Match via the bulk upload API.

### File to Create: `app/services/importer.py`

```python
import httpx
from app.config import settings


class ImportResult:
    def __init__(self, success: int, failed: int, results: list[dict]):
        self.success = success
        self.failed = failed
        self.results = results


class IBMatchImporter:
    def __init__(self):
        self.base_url = settings.ib_match_api_url
        self.token = settings.ib_match_admin_token
    
    async def import_programs(
        self,
        university_id: str,
        programs: list[dict],
        dry_run: bool = False
    ) -> ImportResult:
        """
        Import programs to IB Match.
        
        Args:
            university_id: IB Match university ID
            programs: List of normalized program data
            dry_run: If True, validate only without creating
        """
        if dry_run:
            # Return preview without actually importing
            return ImportResult(
                success=len(programs),
                failed=0,
                results=[{"name": p["name"], "status": "preview"} for p in programs]
            )
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/api/admin/programs/bulk",
                json={
                    "universityId": university_id,
                    "programs": programs
                },
                headers={
                    "Authorization": f"Bearer {self.token}",
                    "Content-Type": "application/json"
                }
            )
            
            response.raise_for_status()
            data = response.json()
            
            return ImportResult(
                success=data.get("success", 0),
                failed=data.get("failed", 0),
                results=data.get("results", [])
            )
```

### Acceptance Criteria
- [ ] Can send programs to IB Match bulk API
- [ ] Dry-run mode returns preview without creating
- [ ] Handles API errors gracefully

---

## TASK-009 through TASK-012: UI Routes and Templates

### Goal
Create the web interface for managing universities, jobs, reviewing programs, and importing.

Each route follows the same pattern - see TASK-002 for the base pattern. The UI templates use HTMX for dynamic updates without full page reloads.

### Files to Create

The specification includes detailed HTML templates for:
- University list, add/edit forms
- Job list, start job, progress monitoring
- Program review table with validation status
- Import preview and confirmation

### Acceptance Criteria
- [ ] Can add a university configuration via web form
- [ ] Can start a scrape job and see progress
- [ ] Can review extracted programs with validation errors
- [ ] Can select programs and import to IB Match

---

## Verification Plan

### Local Development Test

```bash
# 1. Setup
cd university-parser
python -m venv .venv
source .venv/bin/activate
pip install -e .
playwright install chromium

# 2. Configure
cp .env.example .env
# Edit .env with your API keys

# 3. Start IB Match (in another terminal)
cd ../match
npm run dev

# 4. Start Parser
uvicorn app.main:app --reload

# 5. Test in browser
# Visit http://localhost:8000
# Click "Sync Now" - should show courses/fields count
# Add a university config
# Start a scrape job
# Review extracted programs
# Import to IB Match
```

### Unit Tests

```bash
# Run tests
pytest tests/ -v

# Test specific module
pytest tests/test_validator.py -v
```

---

## Summary

This document contains EVERYTHING needed to build the university parser:

| Section | Contents |
|---------|----------|
| TASK-001 | Project structure, dependencies |
| TASK-002 | FastAPI setup, database, templates |
| TASK-003 | All SQLAlchemy models |
| TASK-004 | Reference sync service + IB Match endpoints |
| TASK-005 | Playwright scraper |
| TASK-006 | Gemini extractor |
| TASK-007 | Validator with course mapping |
| TASK-008 | IB Match importer |
| TASK-009+ | UI components |

Each task includes:
- ✅ Goal
- ✅ Files to create with complete code
- ✅ Acceptance criteria

Start at TASK-001 and work through sequentially.
