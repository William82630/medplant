# MedPlant AI - AI Coding Agent Instructions

## Architecture Overview

This is a full-stack web application for AI-powered medicinal plant identification:

- **Frontend**: React 19 + Vite, deployed as SPA with client-side routing
- **Backend**: Hybrid architecture with Node.js Express (legacy/simple routes) and Python FastAPI (main API)
- **AI Service**: Google Gemini 1.5 Pro for plant image analysis
- **Database**: Supabase (PostgreSQL) for user profiles, orders, and data storage
- **Auth**: Supabase Auth with JWT tokens
- **Payments**: Razorpay integration for Pro subscriptions
- **Credits System**: Free tier (10 identifications), Pro (unlimited)

### Key Data Flows

1. **Plant Identification**:
   - User uploads image → Frontend sends to `/api/identify` (Python FastAPI)
   - Python validates auth, checks credits, calls Gemini API
   - Gemini returns structured analysis (name, benefits, risks)
   - Credits deducted for free users, result returned

2. **Authentication**:
   - Supabase handles signup/login, issues JWT
   - Frontend includes `Authorization: Bearer <token>` in API calls
   - Python backend verifies tokens via Supabase REST API calls

3. **Payments**:
   - Frontend creates order via `/api/razorpay/create-order`
   - User pays on Razorpay checkout
   - Webhook at `/api/razorpay/webhook` upgrades user to Pro

## Development Workflows

### Running the Application

```bash
# Terminal 1: Frontend (React + Vite)
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173

# Terminal 2: Backend (Python FastAPI)
cd backend
# Install Python dependencies (no requirements.txt - install manually):
pip install fastapi uvicorn python-dotenv supabase google-genai razorpay httpx
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Optional: Legacy Node server (not required for main functionality)
cd backend
npm install
npm run dev  # Runs on http://localhost:8000 with mock endpoints
```

### Environment Setup

Create `.env` in `backend/` directory:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

Create `.env` in `frontend/` directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Testing AI Integration

- Upload plant images via `/identify` page
- Check browser network tab for API calls to `127.0.0.1:8000/api/identify`
- Gemini responses are cached in Supabase for development
- Use test images from `Hero images/` folder

## Project-Specific Patterns

### Python Backend Structure
- **Routers**: API endpoints in `app/api/` with FastAPI APIRouter
- **Services**: Business logic in `app/services/` (e.g., `GeminiService`)
- **Utils**: Shared utilities in `app/utils/` (auth, Supabase client)
- **Dependency Injection**: Use `Depends()` for auth verification
- **Error Handling**: Raise `HTTPException` with appropriate status codes
- **Environment Loading**: Load `.env` early in `main.py` before imports

### Frontend Patterns
- **Component Organization**: Pages in `src/pages/`, reusable components in `src/components/`
- **State Management**: React hooks + context (see `PlantsContext.jsx`)
- **API Calls**: Direct `fetch()` calls, include auth headers conditionally
- **Modals**: Custom modal components for login, reports, upgrades
- **Styling**: CSS modules with global styles in `src/styles/`

### Authentication Patterns
- **Token Verification**: Python backend calls Supabase REST API to verify JWT
- **User Context**: Frontend uses Supabase auth session for user state
- **Anonymous Access**: Allow plant identification without login, but limit credits
- **Pro Checks**: Check `user.is_pro` flag for unlimited access

### Credits System
- **Free Tier**: 10 identifications, stored in `user_profiles.credits`
- **Pro Users**: `is_pro: true` bypasses credit checks
- **Credit Deduction**: Happens in `identify.py` after successful Gemini call
- **Upgrade Flow**: Razorpay payment → webhook → update `is_pro` flag

### External Integrations
- **Gemini API**: Use `google.genai` client, send image bytes + prompt
- **Supabase**: Use service role key for backend writes, anon key for frontend reads
- **Razorpay**: Create orders server-side, handle webhooks for payment confirmation

## Key Files to Reference

- `backend/app/main.py`: FastAPI app setup, CORS, router inclusion
- `backend/app/api/identify.py`: Main plant identification endpoint
- `backend/app/services/gemini_service.py`: Gemini AI integration
- `backend/app/utils/auth.py`: JWT verification logic
- `frontend/src/pages/Identify.jsx`: Frontend identification flow
- `frontend/src/lib/supabaseClient.js`: Supabase client configuration
- `rzp-key.csv`: Razorpay key storage (check .gitignore)

## Common Pitfalls

- **Environment Variables**: Backend uses `SUPABASE_KEY` (service role), frontend uses `VITE_SUPABASE_ANON_KEY`
- **CORS**: FastAPI allows all origins, but ensure correct ports
- **Python Dependencies**: No requirements.txt - install packages manually
- **Auth Headers**: Include `Authorization: Bearer <token>` for authenticated requests
- **Credit Logic**: Deduct credits only after successful AI analysis
- **Webhook Security**: Verify Razorpay webhook signatures using secret</content>
<parameter name="filePath">d:\medplant-app\.github\copilot-instructions.md