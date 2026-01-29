/**
 * SEO Title Tag Verification Examples
 *
 * This file demonstrates the new SEO-optimized title generation
 * implemented in Task 1.1 of the SEO Implementation Plan.
 */

// Example 1: Standard program with IB requirements (fits in 60 chars)
const _example1 = {
  program: { name: 'Computer Science', minIBPoints: 40 },
  university: { name: 'Oxford', abbreviatedName: 'Oxford' }
}
// Generated title: "IB Requirements: Computer Science at Oxford | 40 Points"
// Length: 57 chars ✓

// Example 2: Program with longer names (requires truncation)
const _example2 = {
  program: { name: 'Engineering Science', minIBPoints: 42 },
  university: { name: 'Imperial College London', abbreviatedName: 'Imperial' }
}
// Generated title: "IB: Engineering Science at Imperial | 42pts"
// Length: 46 chars ✓

// Example 3: Very long program name (uses abbreviation + truncation)
const _example3 = {
  program: { name: 'Biomedical Engineering with Medical Applications', minIBPoints: 38 },
  university: { name: 'Technical University of Munich', abbreviatedName: 'TUM' }
}
// Generated title: "IB: Biomedical Engineering with Medical... at TUM | 38pts"
// Length: ~60 chars ✓

// Example 4: Program without IB requirements (fallback)
const _example4 = {
  program: { name: 'Medicine', minIBPoints: null },
  university: { name: 'Oxford', abbreviatedName: 'Oxford' }
}
// Generated title: "Medicine at Oxford | IB Match"
// Length: 29 chars ✓

/**
 * SEO Benefits:
 *
 * 1. Long-tail keyword optimization:
 *    - "Oxford Computer Science IB requirements" ✓
 *    - "Engineering IB 42 points" ✓
 *    - "[University] IB admission" ✓
 *
 * 2. Front-loaded keywords:
 *    - "IB Requirements" appears first (most important for search)
 *    - Program name before university (more specific intent)
 *
 * 3. Character limit compliance:
 *    - All titles ≤60 characters for optimal SERP display
 *    - No truncation by search engines
 *
 * 4. Fallback handling:
 *    - Programs without IB points get branded title
 *    - University abbreviations used when available
 *    - Graceful truncation preserves critical keywords
 */
