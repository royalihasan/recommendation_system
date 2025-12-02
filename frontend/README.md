# Movie Recommender - Frontend

React-based frontend for the Netflix-style movie recommendation system.

## Features

- 🎨 Modern, responsive UI with premium design
- 🔐 User authentication (login/register)
- 🎬 Movie browsing with search and pagination
- ✨ Personalized recommendations
- ⭐ Star rating component
- 📱 Mobile-friendly responsive design

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS with modern gradients and animations
- **Fonts**: Inter from Google Fonts

## Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:8000`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Update `.env` if needed:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── MovieCard.jsx  # Movie display card
│   │   ├── RatingStars.jsx # Star rating component
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── Loader.jsx     # Loading spinner
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Movies.jsx     # Movie catalog
│   │   ├── Recommendations.jsx  # Personalized suggestions
│   │   ├── Login.jsx      # Login page
│   │   └── Register.jsx   # Registration page
│   ├── services/          # API services
│   │   ├── api.js         # Axios instance
│   │   ├── authService.js  # Authentication
│   │   ├── movieService.js # Movie operations
│   │   ├── ratingService.js # Rating operations
│   │   └── recommendationService.js # Recommendations
│   ├── context/           # React Context
│   │   └── AuthContext.jsx # Auth state management
│   ├── App.jsx            # Main app component
│   ├── index.jsx          # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## Features Explained

### Authentication

- JWT-based authentication with automatic token management
- Protected routes for authenticated users
- Login and registration forms with validation

### Movie Browsing

- Paginated movie catalog
- Real-time search functionality
- Genre filtering (coming soon)
- Movie details with ratings

### Recommendations

- Personalized movie suggestions based on SVD collaborative filtering
- Displays predicted ratings
- Fallback to popular movies for new users

### Design

- Premium gradient backgrounds
- Smooth micro-animations and hover effects
- Responsive grid layouts
- Mobile-first approach

## API Integration

The frontend communicates with the backend API using Axios:

- **Base URL**: `http://localhost:8000/api/v1`
- **Authentication**: Bearer token in Authorization header
- **Error Handling**: Automatic 401 redirect to login

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Ensure backend is running before starting frontend
- Default API proxy configured in `vite.config.js`
- User authentication state persists in localStorage
- Movie posters show first letter placeholder (can be extended with TMDB API)

## Future Enhancements

- Movie detail pages
- User profile management
- Rating history with editing
- Genre filters
- Similar movies section
- Movie trailers integration
- Dark mode support

## License

MIT License
