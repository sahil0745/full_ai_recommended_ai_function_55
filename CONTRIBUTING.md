# 🤝 Contributing to TravelGenie

Thank you for your interest in contributing to TravelGenie! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Expected Behavior
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Be patient and understanding
- Give constructive feedback
- Focus on what is best for the community

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   - Go to [TravelGenie repository](https://github.com/sahil0745/full_ai_recommended_ai_function_55)
   - Click "Fork" button

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/full_ai_recommended_ai_function_55.git
   cd full_ai_recommended_ai_function_55
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/sahil0745/full_ai_recommended_ai_function_55.git
   ```

4. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

5. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Fill in your API keys
   ```

6. **Run development servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run server
   ```

---

## Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `docs/documentation-update` - Documentation updates
- `refactor/refactor-description` - Code refactoring
- `test/test-description` - Test additions or modifications

### Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add Google OAuth integration

Implemented Google OAuth authentication flow with Firebase.
Added Google login button to auth pages.

Closes #123
```

```
fix(booking): prevent double booking submission

Added loading state to prevent multiple form submissions.
Shows spinner during booking creation.

Fixes #456
```

### Keep Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

**Good:**
```typescript
async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const bookings = await Booking.find({ user: userId })
      .populate('hotel')
      .populate('restaurant')
      .sort({ createdAt: -1 });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}
```

**Bad:**
```typescript
async function get(id) {
  const b = await Booking.find({ user: id }).populate('hotel').populate('restaurant').sort({ createdAt: -1 });
  return b;
}
```

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use proper TypeScript types
- Follow component naming conventions

**Good:**
```typescript
interface HotelCardProps {
  hotel: Hotel;
  onBookClick: (hotelId: string) => void;
}

export function HotelCard({ hotel, onBookClick }: HotelCardProps) {
  return (
    <Card className="p-4">
      <h3>{hotel.name}</h3>
      <Button onClick={() => onBookClick(hotel.id)}>
        Book Now
      </Button>
    </Card>
  );
}
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use theme variables

### API Routes

- Use RESTful conventions
- Implement proper error handling
- Add input validation
- Include authentication where needed
- Return consistent response format

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

### Creating Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select base repository and branch
4. Fill in PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added tests
- [ ] All tests passing

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

### Review Process

1. Maintainer reviews your PR
2. Address feedback if needed
3. Make requested changes
4. Push updates to same branch
5. PR gets merged when approved

---

## Issue Guidelines

### Before Creating an Issue

- Search existing issues
- Check if it's already fixed
- Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 90]
- Node version: [e.g., 18.0.0]

**Additional context**
Any other information
```

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Other solutions you've thought about

**Additional context**
Screenshots, mockups, etc.
```

---

## Areas to Contribute

### High Priority
- [ ] Google Maps integration
- [ ] Real-time chat support
- [ ] Advanced search filters
- [ ] Payment gateway testing
- [ ] Mobile app development

### Medium Priority
- [ ] Weather integration
- [ ] Currency converter
- [ ] Multi-language support
- [ ] Performance optimization
- [ ] Accessibility improvements

### Good First Issues
- Documentation improvements
- UI enhancements
- Bug fixes
- Test coverage
- Code refactoring

---

## Development Tips

### Useful Commands

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start backend
npm run server

# Seed database
npm run seed

# View all routes
npm run dev
```

### Debugging

- Use browser DevTools
- Check Network tab for API calls
- Use React DevTools
- Check console for errors
- Use `console.log` strategically

### Testing Locally

1. Test in multiple browsers
2. Test responsive design
3. Test with different data
4. Test error scenarios
5. Test edge cases

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Documentation](https://expressjs.com)

---

## Questions?

- Open an issue with "Question" label
- Email: support@travelgenie.com
- Discord: [Join our server]

---

## Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Given credit in commits

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC License).

---

**Thank you for contributing to TravelGenie! 🎉**
